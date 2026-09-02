<template>
  <section id="contact" class="relative mt-48 md:mt-64 px-6 md:px-10 mb-36 md:mb-52 overflow-hidden">
    <!-- Giant background section number -->
    <div class="absolute -top-8 md:-top-12 -right-4 md:right-10 font-display text-[20vw] md:text-[15vw] font-extrabold leading-none text-white/[0.015] select-none pointer-events-none z-0" aria-hidden="true">
      07
    </div>

    <div class="max-w-[1200px] mx-auto relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        <!-- Left Column: Header, Info, Status & Direct Contacts (5 cols) -->
        <div class="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div class="mb-4">
              <span class="font-handwriting text-2xl text-accent/80">Contact</span>
            </div>

            <!-- Large CTA text -->
            <h2 class="font-display text-[clamp(2.5rem,5.5vw,5rem)] font-extrabold leading-[0.95] tracking-tight text-primary mb-6">
              <SectionTitleReveal text="Let's talk." />
            </h2>

            <p class="text-secondary/70 text-base md:text-lg leading-relaxed mb-10">
              Currently seeking a <span class="text-accent font-medium">3 to 4-month international internship</span> starting June–July 2027. Have an exciting research idea, AI/embedded engineering opportunity, or want to collaborate? Send a message or reach out directly.
            </p>
          </div>

          <!-- Contact links -->
          <div class="flex flex-col gap-6 pt-8 border-t border-white/[0.05]">
            <div class="flex flex-col gap-1.5">
              <span class="font-mono text-[0.65rem] text-secondary/40 tracking-[0.2em] uppercase font-semibold">Direct Email</span>
              <a href="mailto:paul.thomas.stras@gmail.com" 
                 class="font-display text-xl sm:text-2xl font-bold text-primary hover:text-accent transition-colors duration-300 break-words no-underline">
                paul.thomas.stras@gmail.com
              </a>
            </div>

            <div class="flex flex-wrap gap-3">
              <a href="https://github.com/PLRpower" target="_blank" rel="noopener noreferrer" 
                 class="flex items-center gap-2 px-4 py-2.5 border border-white/[0.06] bg-white/[0.02] font-mono text-[0.75rem] text-secondary/70 no-underline hover:text-accent hover:border-accent/20 hover:bg-accent/[0.03] transition-all duration-300">
                <Icon name="uil:github" size="16px" />
                <span>GitHub</span>
                <Icon name="material-symbols:arrow-outward" size="12px" class="opacity-60" />
              </a>
              <a href="https://www.linkedin.com/in/paul-thomas-strasbourg/" target="_blank" rel="noopener noreferrer" 
                 class="flex items-center gap-2 px-4 py-2.5 border border-white/[0.06] bg-white/[0.02] font-mono text-[0.75rem] text-secondary/70 no-underline hover:text-accent hover:border-accent/20 hover:bg-accent/[0.03] transition-all duration-300">
                <Icon name="uil:linkedin" size="16px" />
                <span>LinkedIn</span>
                <Icon name="material-symbols:arrow-outward" size="12px" class="opacity-60" />
              </a>
            </div>
          </div>
        </div>

        <!-- Right Column: Elevated Contact Form Card (7 cols) -->
        <div class="lg:col-span-7 relative">
          <!-- Outer Card with sharp corners and subtle glow -->
          <div class="relative border border-white/[0.08] bg-[#0c0c0c] p-6 sm:p-8 md:p-10 shadow-2xl shadow-black/40 overflow-hidden transition-all duration-500 hover:border-accent/25">
            
            <!-- Ambient Glow -->
            <div class="absolute -top-24 -right-24 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
            <div class="absolute -bottom-24 -left-24 w-80 h-80 bg-accent-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

            <!-- Card Header -->
            <div class="pb-5 mb-6 border-b border-white/[0.06] relative z-10">
              <h3 class="font-display text-xl sm:text-2xl font-bold text-primary tracking-tight">Send a message<span class="text-accent">.</span></h3>
            </div>

            <!-- Contact form -->
            <form class="flex flex-col gap-6 relative z-10" @submit.prevent="handleContactSubmit">
              <!-- Success alert -->
              <div v-if="submitStatus === 'success'" class="flex items-center justify-center gap-2 p-3.5 rounded-md bg-accent/[0.08] border border-accent/20 text-accent font-mono text-sm">
                <Icon name="uil:check-circle" size="18px" />
                <span>Message delivered successfully! I will reply shortly.</span>
              </div>

              <template v-else>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <!-- Name Field -->
                  <div class="flex flex-col gap-2">
                    <label for="name" class="font-mono text-xs text-secondary/70">
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      placeholder="e.g. Marie Curie" 
                      autocomplete="name" 
                      required 
                      class="w-full bg-white/[0.02] rounded-md border border-white/[0.08] px-4 py-3.5 font-sans text-sm text-primary placeholder:text-secondary/25 outline-none transition-all duration-300 focus:border-accent/50 focus:bg-accent/[0.02] focus:ring-1 focus:ring-accent/30" 
                    />
                  </div>

                  <!-- Email Field -->
                  <div class="flex flex-col gap-2">
                    <label for="email" class="font-mono text-xs text-secondary/70">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="e.g. marie@research.org" 
                      autocomplete="email" 
                      required 
                      class="w-full bg-white/[0.02] rounded-md border border-white/[0.08] px-4 py-3.5 font-sans text-sm text-primary placeholder:text-secondary/25 outline-none transition-all duration-300 focus:border-accent/50 focus:bg-accent/[0.02] focus:ring-1 focus:ring-accent/30" 
                    />
                  </div>
                </div>
                
                <!-- Message Field -->
                <div class="flex flex-col gap-2">
                  <label for="message" class="font-mono text-xs text-secondary/70 flex items-center justify-between">
                    <span>Your Message</span>
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    placeholder="Share details about your team, research project, or engineering opportunity..." 
                    required
                    class="w-full bg-white/[0.02] rounded-md border border-white/[0.08] px-4 py-3.5 font-sans text-sm text-primary placeholder:text-secondary/25 outline-none transition-all duration-300 focus:border-accent/50 focus:bg-accent/[0.02] focus:ring-1 focus:ring-accent/30 resize-none"
                  ></textarea>
                </div>
                
                <!-- Action Row -->
                <div class="pt-2">
                  <button 
                    type="submit" 
                    :disabled="isSubmitting"
                    class="flex items-center justify-center gap-3 py-3.5 px-8 rounded-md font-mono text-sm cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group/btn bg-accent/[0.08] border border-accent/30 text-accent hover:bg-accent hover:text-black hover:shadow-[0_0_20px_rgba(45,212,191,0.25)] hover:-translate-y-0.5 active:translate-y-0 font-medium"
                  >
                    <span v-if="!isSubmitting">Send Message</span>
                    <span v-else>Sending...</span>
                    <Icon v-if="!isSubmitting" name="ph:paper-plane-right-bold" size="16px" class="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    <Icon v-else name="line-md:loading-twotone-loop" size="18px" />
                  </button>
                </div>
                
                <!-- Error alert -->
                <div v-if="submitStatus === 'error'" class="flex items-center justify-center gap-2 p-3.5 rounded-md bg-red-500/[0.08] border border-red-500/20 text-red-400 font-mono text-sm">
                  <Icon name="uil:exclamation-triangle" size="18px" />
                  <span>An error occurred. Please try again or email directly.</span>
                </div>
              </template>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isSubmitting = ref(false);
const submitStatus = ref<'success' | 'error' | null>(null);

const handleContactSubmit = async (e: Event) => {
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  };

  isSubmitting.value = true;
  submitStatus.value = null;

  try {
    await $fetch('/api/contact', { method: 'POST', body: payload });
    submitStatus.value = 'success';
    form.reset();
  } catch (err) {
    console.error('Submission error:', err);
    submitStatus.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
};
</script>
