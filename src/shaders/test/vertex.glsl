

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;

varying vec3 vPosition;
float rand(float co) { return fract(sin(co*(91.3458)) * 47453.5453); }

void main()
{


    vPosition = position;

    //***** https://learnopengl.com/Getting-started/Coordinate-Systems *****//

    // 1)postion our geometry - coordinates your object begins in.
    
    // vec4 localPosition = vec4(position , 1.0);
    // vec4 localPosition = vec4(rand(position.x), rand(position.y), position.z , 1.0);
    // vec4 localPosition = vec4(position.x * rand(position.x), position.y * rand(position.y), position.z , 1.0);
    // vec4 localPosition = vec4(position.x + rand(position.x), position.y + rand(position.y), position.z , 1.0);
    // vec4 localPosition = vec4(position.x , position.y * sin(position.y), position.z , 1.0);
    // vec4 localPosition = vec4(rand(position.x )* 10.,  rand(position.y) * 10., rand(position.z )*10., 1.0);
    // vec4 localPosition = vec4(position.x +(rand(position.x) * 1.), position.y + (rand(position.y) * 1.), position.z , 1.0);
    vec4 localPosition = vec4(position.x , position.y * aRandom, position.z , 1.0);
    

    
    // 2)transform the local coordinates to world-space coordinates
    vec4 worldPosition = modelMatrix * localPosition;
    
    // 3)transform the world coordinates to view-space coordinates - seen from the camera/viewer point of view
    vec4 viewPosition = viewMatrix * worldPosition;

    // 4)project view coordinates to clip coordinates and transform to screen coordinates
    vec4 clipPosition = projectionMatrix * viewPosition;

    gl_Position = clipPosition;
    gl_PointSize = 2.;


}