/** Shared density trail and a local, bounded warp of the cached heading texture. */
export const FLUID_FRAGMENT = `
  varying vec2 vUv;
  uniform sampler2D density;
  uniform sampler2D velocity;
  uniform sampler2D headingTexture;
  uniform vec4 headingRect;
  uniform float headingEnabled;
  uniform vec2 viewport;
  uniform vec3 cobalt;
  uniform vec3 amber;
  void main() {
    float ink = max(texture2D(density, vUv).b, 0.0);
    float strength = 1.0 - exp(-ink * 1.5);
    vec3 tint = mix(cobalt, amber, smoothstep(0.2, 0.85, strength));
    float alpha = strength * 0.3;
    vec3 premultiplied = tint * alpha;
    if (headingEnabled > 0.5) {
      vec2 textUv = (vUv - headingRect.xy) / headingRect.zw;
      if (all(greaterThanEqual(textUv, vec2(0.0))) && all(lessThanEqual(textUv, vec2(1.0)))) {
        vec2 flow = texture2D(velocity, vUv).xy;
        vec2 warp = clamp(flow * 0.02, vec2(-1.0), vec2(1.0)) * 12.0 * strength;
        vec2 sampleUv = textUv - warp / (viewport * headingRect.zw);
        vec4 text = texture2D(headingTexture, sampleUv);
        premultiplied = text.rgb * text.a + premultiplied * (1.0 - text.a);
        alpha = text.a + alpha * (1.0 - text.a);
      }
    }
    gl_FragColor = vec4(premultiplied / max(alpha, 0.00001), alpha);
    #include <colorspace_fragment>
  }
`;
