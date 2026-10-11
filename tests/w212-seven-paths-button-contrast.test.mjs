import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const css=readFileSync("src/app/pansofie-v2.css","utf8");
const paths=readFileSync("src/app/7-cest/page.jsx","utf8");
const fix=css.slice(css.indexOf("/* W2.12 PATHS CTA CONTRAST"));

function rgb(hex) {
  return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255)
    .map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);
}
function contrast(a,b) {
  const lum=x=>[.2126,.7152,.0722].reduce((s,w,i)=>s+w*rgb(x)[i],0);
  const [x,y]=[lum(a),lum(b)].sort((a,b)=>b-a);
  return (x+.05)/(y+.05);
}
test("path CTA colors meet WCAG AA normal text contrast",()=>{
  for (const [name,fg,bg] of [
    ["solid","#ffffff","#155239"],
    ["solid-hover","#ffffff","#0d3927"],
    ["light","#163f30","#fffdf6"],
    ["light-hover","#113527","#e5e9dd"],
    ["outline","#ffffff","#07331f"],
    ["outline-hover","#153b28","#fffdf6"],
    ["card","#173e2f","#fffdfa"],
    ["card-hover","#ffffff","#154934"],
  ]) assert.ok(contrast(fg,bg)>=4.5,name+" contrast is "+contrast(fg,bg));
});
test("CTA selectors are more specific than global .ps2-site a inherit and cover visited hover focus states",()=>{
  assert.match(css,/\.ps2-site a\s*\{\s*color:\s*inherit/);
  for(const style of ["solid","light","outline"])
    for(const state of ["",":visited",":hover",":focus-visible"])
      assert.ok(fix.includes("a.ps2-paths__button--"+style+state),style+state);
  assert.match(fix,/\.ps2-site \.ps2-paths a\.ps2-paths__button--solid[^{]*\{\s*color:\s*#ffffff;/);
  assert.match(fix,/\.ps2-site \.ps2-paths a\.ps2-paths__button--light[^{]*\{\s*color:\s*#163f30;/);
  assert.match(fix,/\.ps2-site \.ps2-paths a\.ps2-paths__button--outline[^{]*\{\s*color:\s*#ffffff;/);
  assert.match(fix,/\.ps2-paths__card-body > a:focus-visible/);
  assert.match(fix,/\.ps2-paths__audience-card > a:focus-visible/);
  assert.match(paths,/ps2-paths__button--solid/);
  assert.match(paths,/ps2-paths__button--light/);
  assert.match(paths,/ps2-paths__button--outline/);
});
test("mobile headings wrap within the viewport and CTA links remain links",()=>{
  assert.match(fix,/@media\(max-width:680px\)/);
  assert.match(fix,/\.ps2-paths__hero h1[^{]*\{[^}]*font-size:clamp\(/);
  assert.match(fix,/\.ps2-paths__join h2[^{]*\{[^}]*white-space:normal/);
  assert.match(paths,/<a className="ps2-paths__button/);
  assert.match(paths,/<Link className="ps2-paths__button/);
});
