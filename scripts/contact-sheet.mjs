import sharp from "sharp";
const sections=["inizio","lavori","approccio","servizi","case-study","process","prezzi","payment","faq","preventivo","quote","success"];
const width=210, height=650, gap=14, columns=4;
const layers=[];
for(let index=0;index<sections.length;index++){
  const name=sections[index];
  const resized=await sharp(`qa/final/390-${name}.png`).resize({width,height:height-28,fit:"inside"}).toBuffer();
  const meta=await sharp(resized).metadata();
  const x=gap+(index%columns)*(width+gap),y=gap+Math.floor(index/columns)*(height+gap);
  layers.push({input:resized,left:x+Math.floor((width-meta.width)/2),top:y+28});
  layers.push({input:Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="210" height="24"><text x="0" y="16" fill="#d7d3cb" font-family="Arial" font-size="10" letter-spacing="1">${String(index+1).padStart(2,"0")} / ${name.toUpperCase()}</text></svg>`),left:x,top:y});
}
await sharp({create:{width:columns*(width+gap)+gap,height:Math.ceil(sections.length/columns)*(height+gap)+gap,channels:3,background:"#0a0b0b"}}).composite(layers).webp({quality:88}).toFile("qa/final/contact-sheet-mobile.webp");
