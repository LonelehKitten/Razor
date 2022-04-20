attribute vec3 a_position;
attribute vec4 a_color;

varying vec4 color_data;

uniform mat4 u_orthographic;

void main() {
    color_data = a_color;
    gl_Position = u_orthographic * vec4(a_position, 1.0);
    //gl_Position = vec4(a_position, 1.0);
}