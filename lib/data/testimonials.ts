export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

// Populate when real testimonials are available. Section auto-hides when empty
// or when SITE_CONFIG.showTestimonials is false.
export const testimonials: Testimonial[] = []
