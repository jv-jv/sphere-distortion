

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;

varying vec3 vPosition;

void main()
{


    vPosition = position;

    //***** https://learnopengl.com/Getting-started/Coordinate-Systems *****//

    // 1)postion our geometry - coordinates your object begins in.
    vec4 localPosition = vec4(position , 1.0);
    
    // 2)transform the local coordinates to world-space coordinates
    vec4 worldPosition = modelMatrix * localPosition;
    
    // 3)transform the world coordinates to view-space coordinates - seen from the camera/viewer point of view
    vec4 viewPosition = viewMatrix * worldPosition;

    // 4)project view coordinates to clip coordinates and transform to screen coordinates
    vec4 clipPosition = projectionMatrix * viewPosition;

    gl_Position = clipPosition;
    gl_PointSize = 1.8;


}