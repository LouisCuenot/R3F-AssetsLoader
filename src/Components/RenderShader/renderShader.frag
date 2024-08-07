varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uTransiTexture;
uniform float uProgress;

void main() { 
    vec3 txtr = texture2D(uTexture,vUv).rgb;
    vec3 transiTxtr = texture2D(uTransiTexture,vUv).rgb;
    vec3 fusionnedTxtr = mix(txtr,transiTxtr,uProgress);
    gl_FragColor = vec4(fusionnedTxtr,1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment> 
}