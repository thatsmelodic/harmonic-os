"""Generate optimized Harmonic OS district GLB assets in Blender.

Run headlessly:
  blender -b --python scripts/blender/generate_harmonic_districts.py

Outputs are written to public/models/<district>/ and are automatically picked up
by the Harmonic OS district model manifest.
"""
from __future__ import annotations

import math
import os
from pathlib import Path

import bpy
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "models"

PALETTES = {
    "two-harmonic": ((0.78, 0.66, 0.49, 1), (0.95, 0.80, 0.48, 1), (0.08, 0.06, 0.04, 1)),
    "fried-em": ((0.16, 0.07, 0.03, 1), (1.0, 0.27, 0.04, 1), (0.83, 0.83, 0.83, 1)),
    "schmackinn": ((0.06, 0.03, 0.09, 1), (1.0, 0.08, 0.55, 1), (1.0, 0.47, 0.18, 1)),
    "melodic": ((0.03, 0.04, 0.10, 1), (0.36, 0.28, 1.0, 1), (0.02, 0.02, 0.03, 1)),
    "business": ((0.10, 0.14, 0.19, 1), (0.74, 0.62, 0.36, 1), (0.52, 0.63, 0.72, 1)),
}


def reset_scene() -> None:
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for block in (bpy.data.meshes, bpy.data.curves, bpy.data.materials, bpy.data.cameras, bpy.data.lights):
        for item in list(block):
            if item.users == 0:
                block.remove(item)


def mat(name: str, color, metallic=0.0, roughness=0.5, emission=None, emission_strength=0.0):
    material = bpy.data.materials.new(name)
    material.diffuse_color = color
    material.use_nodes = True
    bsdf = material.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    if emission:
        bsdf.inputs["Emission Color"].default_value = emission
        bsdf.inputs["Emission Strength"].default_value = emission_strength
    return material


def cube(name, location, scale, material, bevel=0.08):
    bpy.ops.mesh.primitive_cube_add(location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if bevel:
        mod = obj.modifiers.new("Bevel", "BEVEL")
        mod.width = bevel
        mod.segments = 3
    obj.data.materials.append(material)
    return obj


def cylinder(name, location, radius, depth, material, vertices=32, rotation=(0, 0, 0)):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(material)
    return obj


def torus(name, location, major, minor, material, rotation=(0, 0, 0)):
    bpy.ops.mesh.primitive_torus_add(major_radius=major, minor_radius=minor, major_segments=64, minor_segments=16, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(material)
    return obj


def add_windows(parent, width, height, rows, cols, material, z_front):
    for row in range(rows):
        for col in range(cols):
            x = ((col + 0.5) / cols - 0.5) * width * 0.82
            y = ((row + 0.5) / rows - 0.5) * height * 0.78
            win = cube(f"window_{row}_{col}", (x, y, z_front), (width / cols * 0.22, height / rows * 0.12, 0.025), material, 0.01)
            win.parent = parent


def fashion_house():
    stone, gold, black = [mat(f"fashion_{i}", c, metallic=.2 if i == 1 else .05, roughness=.28 if i == 1 else .5, emission=c if i == 1 else None, emission_strength=2.0 if i == 1 else 0) for i, c in enumerate(PALETTES["two-harmonic"])]
    cube("monument", (0, 3.0, -5), (5.5, 3.0, 2.0), stone, .18)
    torus("infinity_left", (-.9, 3.2, -2.96), 1.0, .12, gold, (math.pi / 2, 0, 0))
    torus("infinity_right", (.9, 3.2, -2.96), 1.0, .12, gold, (math.pi / 2, 0, 0))
    cube("runway", (0, .05, 4), (3.5, .08, 12), stone, .04)
    for x in (-4.2, 4.2):
        cube("gallery_tower", (x, 2.5, -1), (1.4, 2.5, 1.4), black, .14)
        torus("gallery_mark", (x, 2.5, .43), .62, .08, gold, (math.pi / 2, 0, 0))
    for i, x in enumerate((-1.8, 0, 1.8)):
        cylinder("garment_body", (x, 1.55, 1.5 - i * 1.3), .48, 2.2, black if i == 1 else stone)
        torus("garment_mark", (x, 1.65, 2.0 - i * 1.3), .18, .035, gold, (math.pi / 2, 0, 0))


def blacktop_park():
    asphalt, orange, white = [mat(f"court_{i}", c, metallic=0.05, roughness=.8 if i == 0 else .35, emission=c if i == 1 else None, emission_strength=2.2 if i == 1 else 0) for i, c in enumerate(PALETTES["fried-em"])]
    cube("court", (0, 0, 0), (7, .08, 10), asphalt, .02)
    cube("backboard", (0, 3.2, -8.8), (2.4, 1.35, .08), white, .04)
    cylinder("pole", (0, 1.6, -9.4), .12, 6.0, white)
    torus("rim", (0, 2.0, -8.0), .62, .07, orange, (math.pi / 2, 0, 0))
    cube("scoreboard", (0, 5.5, -9.2), (2.3, .65, .18), asphalt, .08)
    add_windows(bpy.context.object, 3.8, .7, 1, 8, orange, .2)
    for x in (-6, 6):
        cylinder("light_pole", (x, 3, -1), .1, 6, white)
        cube("light_bank", (x, 6, -1), (.8, .18, .3), orange, .03)


def flavor_city():
    dark, pink, amber = [mat(f"food_{i}", c, metallic=.5 if i == 0 else .1, roughness=.25, emission=c if i else None, emission_strength=2.5 if i else 0) for i, c in enumerate(PALETTES["schmackinn"])]
    for i, x in enumerate((-4.5, 0, 4.5)):
        building = cube("restaurant", (x, 2.1, -4 - abs(x) * .25), (2.0, 2.1, 1.8), dark, .12)
        sign = cube("neon_sign", (x, 2.6, -2.15 - abs(x) * .25), (1.5, .55, .04), pink if i == 1 else amber, .03)
        sign.parent = building
        add_windows(building, 3.8, 3.2, 3, 3, pink, 1.82)
    cube("food_truck", (3, .9, 2.8), (2.0, .9, 1.1), mat("truck", (.55, .12, .25, 1), metallic=.35, roughness=.35), .18)
    cube("service_window", (3, 1.0, 3.92), (1.25, .4, .03), amber, .02)
    for x in (-6, 6):
        cylinder("lamp", (x, 1.8, 0), .07, 3.6, dark)
        bpy.ops.object.light_add(type="POINT", location=(x, 3.5, 0))
        bpy.context.object.data.color = pink[:3]
        bpy.context.object.data.energy = 700


def recording_complex():
    navy, violet, black = [mat(f"studio_{i}", c, metallic=.8 if i != 1 else .35, roughness=.2, emission=c if i == 1 else None, emission_strength=2.0 if i == 1 else 0) for i, c in enumerate(PALETTES["melodic"])]
    for x in (-4, 4):
        cube("speaker_tower", (x, 3.1, -4), (1.6, 3.1, 1.35), navy, .16)
        for y, r in ((4.2, .78), (2.2, .7), (.5, .58)):
            cylinder("speaker_cone", (x, y, -2.62), r, .18, black, rotation=(math.pi / 2, 0, 0))
            torus("speaker_ring", (x, y, -2.50), r, .06, violet, (math.pi / 2, 0, 0))
    cube("studio_core", (0, 2.7, -6), (2.8, 2.7, 1.8), navy, .18)
    for i in range(24):
        h = .4 + abs(math.sin(i * .73)) * 2.2
        cube("eq_bar", (-5.75 + i * .5, h / 2, 0), (.11, h / 2, .11), violet, .02)
    torus("frequency_portal", (0, 4.0, -3.9), 1.35, .12, violet, (math.pi / 2, 0, 0))


def financial_skyline():
    steel, gold, glass = [mat(f"biz_{i}", c, metallic=.9, roughness=.14, emission=c if i == 1 else None, emission_strength=1.3 if i == 1 else 0) for i, c in enumerate(PALETTES["business"])]
    for i, x in enumerate((-5.2, -1.8, 1.8, 5.2)):
        h = 6.5 + i * 1.6
        tower = cube("capital_tower", (x, h / 2, -4 - i), (1.45, h / 2, 1.45), steel if i % 2 == 0 else glass, .12)
        add_windows(tower, 2.7, h - .8, max(5, int(h)), 3, gold, 1.46)
    cylinder("founder_plaza", (0, .3, 2), 3.0, .6, steel, vertices=64)
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=1.2, location=(0, 2.8, 2))
    orb = bpy.context.object
    orb.name = "capital_orb"
    orb.data.materials.append(gold)


def export_scene(district: str, filename: str) -> None:
    target = OUT / district / filename
    target.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.export_scene.gltf(
        filepath=str(target),
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_yup=True,
        export_materials="EXPORT",
        export_cameras=False,
        export_lights=True,
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6,
    )
    print(f"Exported {target}")


def build(district: str, filename: str, builder) -> None:
    reset_scene()
    builder()
    export_scene(district, filename)


if __name__ == "__main__":
    build("two-harmonic", "fashion-house.glb", fashion_house)
    build("fried-em", "blacktop-park.glb", blacktop_park)
    build("schmackinn", "flavor-city-block.glb", flavor_city)
    build("melodic", "recording-complex.glb", recording_complex)
    build("business", "financial-skyline.glb", financial_skyline)
    print("Harmonic OS district asset generation complete.")
