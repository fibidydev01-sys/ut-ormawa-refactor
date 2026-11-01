import json

with open('.output/server/package.json', 'r', encoding='utf8') as f:
    p = json.load(f)

p['dependencies'] = {
    k:v for k,v in p['dependencies'].items() 
    if not k.startswith('@img/sharp-') and not k.startswith('@tiptap')
}

with open('.output/server/package.json', 'w', encoding='utf8') as f:
    json.dump(p, f, indent=2)
