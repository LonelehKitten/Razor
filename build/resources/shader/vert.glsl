attribute vec3 a_position;
attribute vec4 a_color;

varying vec4 color_data;

void main() {
    color_data = a_color;
    gl_Position = vec4(a_position, 1.0);
}