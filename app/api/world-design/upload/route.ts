import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireStudioUser, studioAuthError } from '@/lib/studio-auth-server';

const BUCKET='world-assets';
const MAX_BYTES=5*1024*1024*1024;

function getEnv(){
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/,'');
  const serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!serviceKey)throw new Error('World asset storage is not configured');
  return{url,serviceKey};
}

async function ensureBucket(url:string,serviceKey:string){
  const supabase=createClient(url,serviceKey,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data:bucket}=await supabase.storage.getBucket(BUCKET);
  if(bucket){
    const {error}=await supabase.storage.updateBucket(BUCKET,{public:true,fileSizeLimit:MAX_BYTES,allowedMimeTypes:['image/*','video/*']});
    if(error)throw error;
  }else{
    const {error}=await supabase.storage.createBucket(BUCKET,{public:true,fileSizeLimit:MAX_BYTES,allowedMimeTypes:['image/*','video/*']});
    if(error)throw error;
  }
  return supabase;
}

export async function POST(request:Request){
  try{await requireStudioUser(request)}catch(error){const auth=studioAuthError(error);return NextResponse.json({error:auth.error},{status:auth.status})}
  try{
    const {url,serviceKey}=getEnv();
    const body=await request.json() as {world?:string;name?:string;size?:number;mimeType?:string};
    const world=String(body.world||'global').replace(/[^a-z0-9-]/gi,'-');
    const name=String(body.name||'upload').replace(/[^a-z0-9._-]/gi,'-');
    const size=Number(body.size||0);
    const mimeType=String(body.mimeType||'application/octet-stream');
    if(size<=0)return NextResponse.json({error:'The selected file is empty.'},{status:400});
    if(size>MAX_BYTES)return NextResponse.json({error:'Files must be 5 GB or smaller.'},{status:413});
    if(!mimeType.startsWith('image/')&&!mimeType.startsWith('video/'))return NextResponse.json({error:'Only images, GIFs, and videos are supported.'},{status:400});
    const supabase=await ensureBucket(url,serviceKey);
    const path=`${world}/${crypto.randomUUID()}-${name}`;
    const {data,error}=await supabase.storage.from(BUCKET).createSignedUploadUrl(path,{upsert:false});
    if(error||!data?.token)throw error||new Error('Unable to prepare upload');
    const projectId=new URL(url).hostname.split('.')[0];
    return NextResponse.json({ok:true,token:data.token,path,url:`${url}/storage/v1/object/public/${BUCKET}/${path}`,endpoint:`https://${projectId}.storage.supabase.co/storage/v1/upload/resumable`,type:mimeType.startsWith('video/')?'video':'image',maxBytes:MAX_BYTES});
  }catch(error){return NextResponse.json({error:error instanceof Error?error.message:'Upload service failed.'},{status:500})}
}