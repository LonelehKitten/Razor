attribute vec3 a_position;
attribute vec4 a_color;

varying vec4 color_data;

uniform vec3 u_test;

void main() {
    color_data = a_color;
    gl_Position = vec4(a_position, 1.0);
}