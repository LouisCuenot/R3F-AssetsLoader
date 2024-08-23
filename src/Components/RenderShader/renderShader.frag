varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uTransiTexture;
uniform float uProgress;

void main() { 
    vec4 txtr = texture2D(uTexture,vUv);
    vec4 transiTxtr = texture2D(uTransiTexture,vUv);
    vec4 fusionnedTxtr = mix(txtr,transiTxtr,uProgress);
    gl_FragColor = vec4(fusionnedTxtr);

    #include <tonemapping_fragment>
    #include <colorspace_fragment> 
}