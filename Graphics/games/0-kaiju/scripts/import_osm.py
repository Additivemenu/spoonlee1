"""Convert an OSM XML extract into the game's 500 m Melbourne sector.
Usage: python3 scripts/import_osm.py input.osm public/data/melbourne.json
Download: https://api.openstreetmap.org/api/0.6/map?bbox=144.9600,-37.8170,144.9657,-37.8125
Coordinates are local metres; absent heights use deterministic estimates.
"""
import xml.etree.ElementTree as ET
import json, math, sys
from pathlib import Path
root=ET.parse(sys.argv[1]).getroot()
lat0,lon0=-37.81475,144.96285
nodes={n.attrib['id']:((float(n.attrib['lon'])-lon0)*111320*math.cos(math.radians(lat0)),-(float(n.attrib['lat'])-lat0)*111320) for n in root.findall('node')}
def clip(poly):
    for axis,edge,sign in [(0,-250,1),(0,250,-1),(1,-250,1),(1,250,-1)]:
        output=[]
        for i,p in enumerate(poly):
            q=poly[i-1]; a=(p[axis]-edge)*sign>=0; b=(q[axis]-edge)*sign>=0
            if a!=b:
                t=(edge-q[axis])/(p[axis]-q[axis]); output.append(tuple(q[j]+(p[j]-q[j])*t for j in range(2)))
            if a:output.append(p)
        poly=output
        if not poly:break
    return poly
buildings=[];roads=[]
for way in root.findall('way'):
    tags={t.attrib['k']:t.attrib['v'] for t in way.findall('tag')}
    pts=[nodes[n.attrib['ref']] for n in way.findall('nd') if n.attrib['ref'] in nodes]
    if 'building' in tags and len(pts)>=4 and pts[0]==pts[-1]:
        pts=clip(pts[:-1])
        if len(pts)<3:continue
        xs,zs=zip(*pts); w=max(xs)-min(xs); d=max(zs)-min(zs)
        area=abs(sum(pts[i][0]*pts[i-1][1]-pts[i-1][0]*pts[i][1] for i in range(len(pts))))/2
        if area<35 or w<3 or d<3:continue
        osm_id=int(way.attrib['id'])
        try:h=float(tags['height'].replace(' m',''))
        except (KeyError,ValueError):
            try:h=float(tags['building:levels'])*3.3
            except (KeyError,ValueError):h=14+osm_id%62
        h=max(6,min(140,h)); x=(min(xs)+max(xs))/2; z=(min(zs)+max(zs))/2
        buildings.append(dict(id=len(buildings),osmId=osm_id,x=round(x,2),z=round(z,2),w=round(w,2),d=round(d,2),h=round(h,2),hp=h*2,maxHp=h*2,kind=2 if h>55 else 1 if h>25 else 0,footprint=[[round(x,2),round(z,2)]for x,z in pts]))
    elif tags.get('highway') in ('primary','secondary','tertiary','residential','service','unclassified','pedestrian','living_street'):
        for p,q in zip(pts,pts[1:]):
            # Liang-Barsky clipping of road segments.
            dx,dz=q[0]-p[0],q[1]-p[1];lo,hi=0.,1.
            for a,b in [(-dx,p[0]+250),(dx,250-p[0]),(-dz,p[1]+250),(dz,250-p[1])]:
                if a==0:
                    if b<0:hi=-1;break
                elif a<0:lo=max(lo,b/a)
                else:hi=min(hi,b/a)
            if lo<=hi:roads.append([[round(p[0]+dx*t,2),round(p[1]+dz*t,2)]for t in (lo,hi)])
result=dict(buildings=buildings,roads=roads,source='Melbourne CBD · OpenStreetMap footprints · estimated heights where missing',attribution='© OpenStreetMap contributors',license='ODbL 1.0',sourceUrl='https://www.openstreetmap.org/copyright',center=[lat0,lon0],boundsMetres=[-250,-250,250,250])
Path(sys.argv[2]).parent.mkdir(parents=True,exist_ok=True)
Path(sys.argv[2]).write_text(json.dumps(result,separators=(',',':')))
print(f'Imported {len(buildings)} building footprints and {len(roads)} road segments')
