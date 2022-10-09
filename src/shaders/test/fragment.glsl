precision mediump float;


varying vec3 vPosition;
varying vec3 vColors;
varying float vRandom;

void main()
{
    // gl_FragColor = vec4(1.0 * vColors.r, 1.0 * vColors.g, 1.0 * vColors.b, 1.0);
    // gl_FragColor = vec4(1.0 , 1.0 * vColors.g, 1.0 * vColors.b, 1.0);
    // gl_FragColor = vec4( vColors.r, vColors.g, vColors.b, 1.0);
    gl_FragColor = vec4( 1.0, 1.0  * vRandom , 1.0, 1.0);



}