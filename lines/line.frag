precision mediump float;

#define PI 3.14159265359

uniform vec2 u_resolution;

//GLOBAL_START
float stroke(float x, float s, float w){
    float d = step(s,x+w*.5) - 
              step(s,x-w*.5);
    return clamp(d, 0., 1.);
} 
//GLOBAL_END

void main() {
    vec3 color = vec3(0.0,0.0,0.0);
    vec2 st = gl_FragCoord.xy/u_resolution;
    st = (st-0.5)*1.1912+0.5;
    
    // START
    color += stroke(st.x, 0.5, 0.15);
    //color += step(.5,st.x);
    // END
    gl_FragColor = vec4(color, 1.0);
}