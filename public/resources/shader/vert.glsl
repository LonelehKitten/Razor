attribute vec3 a_position;
attribute vec3 a_normal;
//attribute vec4 a_color;

varying vec4 v_color;

uniform int u_selected;
uniform mat4 u_transform;
uniform mat4 u_view;
uniform mat4 u_projection;

void main() {

    v_color = vec4(1, 0, 0, 1);

    if(u_selected == 0) {
        v_color = vec4(normalize(a_position.xyz), 1);
    }
    
    gl_Position = u_projection * u_view * u_transform * vec4(a_position, 1.0);
}