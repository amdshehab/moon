#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;
varying float noise;
uniform vec4 uColor;

uniform vec2 u_resolution;
void main(){
  
  // compose the colour using the UV coordinate
  // and modulate it with the noise like ambient occlusion
  // vec3 color=vec3(vUv*(1.-2.*noise),.0);
  // vec3 other=vec3(0,0,0)
  
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  
  vec3 color1=vec3(1.9,.55,0);
  vec3 color2=vec3(.0196,0.,.0471);
  
  float mixValue=distance(st,vec2(0,1));
  vec3 color=mix(color1,color2,mixValue);
  
  // gl_FragColor=vec4(color,mixValue);
  gl_FragColor=uColor;
}