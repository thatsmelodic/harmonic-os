import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireStudioUser, studioAuthError } from '@/lib/studio-auth-server';

const BUCKET='world-assets';
const MAX_IMAGE_BYTES=2*1024*1024;

export async function POST(request:Request){
  try{await requireStudioUser(request)}catch(error){const auth=studioAuthError(error);return NextResponse.json({error:auth.error},{status:auth.status})}
  try{
    const url=process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/,'');
    const serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
    if(!url||!serviceKey)throw new Error('World asset storage is not configured');
    const form=await request.formData();
    const file=form.get('file');
    const world=String(form.get('world')||'global').replace(/[^a-z0-9-]/gi,'-');
    if(!(file instanceof File))return NextResponse.json({error:'Choose an image file.'},{status:400});
    if(!file.type.startsWith('image/'))return NextResponse.json({error:'This endpoint accepts images only.'},{status:400});
    if(file.size<=0)return NextResponse.json({error:'The selected image is empty.'},{status:400});
    if(file.size>MAX_IMAGE_BYTES)return NextResponse.json({error:'Optimized images must be 2 MB or smaller.'},{status:413});
    const supabase=createClient(url,serviceKey,{auth:{persistSession:false,autoRefreshToken:false}});
    const safeName=file.name.replace(/[^a-z0-9._-]/gi,'-');
    const path=`${world}/${crypto.randomUUID()}-${safeName}`;
    const bytes=new Uint8Array(await file.arrayBuffer());
    const {error}=await supabase.storage.from(BUCKET).upload(path,bytes,{contentType:file.type,cacheControl:'3600',upsert:false});
    if(error)throw error;
    return NextResponse.json({ok:true,url:`${url}/storage/v1/object/public/${BUCKET}/${path}`,path,type:'image',name:file.name,size:file.size});
  }catch(error){return NextResponse.json({error:error instanceof Error?error.message:'Image upload failed.'},{status:500})}
}
