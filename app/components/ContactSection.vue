<template>
  <section id="contact" class="relative mt-48 md:mt-64 px-6 md:px-10 mb-20 overflow-hidden">
    <div class="absolute -top-16 -right-4 md:right-10 font-display text-[20vw] md:text-[15vw] font-extrabold leading-none text-white/[0.015] light:text-black/[0.015] select-none pointer-events-none z-0" aria-hidden="true">
      07
    </div>

    <div class="max-w-[1200px] mx-auto relative z-10">
      <div class="flex items-center gap-4 mb-6">
        <span class="font-handwriting text-2xl text-accent/80">Contact</span>
        <div class="w-12 h-px bg-accent/20"></div>
      </div>

      <!-- Large CTA text -->
      <h2 class="font-display text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-tight text-primary mb-4">
        <SectionTitleReveal text="Let's talk." />
      </h2>
      <p class="text-secondary/50 text-lg max-w-[500px] leading-relaxed mb-16">
        Currently seeking a <span class="text-accent">3-month international internship</span> in 2027. Have an exciting opportunity or want to collaborate on a project? Let's connect!
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
        <!-- Contact links -->
        <div class="flex flex-col gap-8">
          <a href="mailto:paul.thomas.stras@gmail.com" 
             class="group flex items-start gap-4 no-underline">
            <div class="w-10 h-10 rounded-lg border border-white/[0.06] light:border-black/[0.06] bg-white/[0.02] light:bg-black/[0.02] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-accent/20 group-hover:bg-accent/[0.05]">
              <Icon name="uil:envelope" size="18px" class="text-secondary/50 group-hover:text-accent transition-colors duration-300" />
            </div>
            <div class="flex flex-col gap-1">
              <span class="font-mono text-[0.6rem] text-secondary/30 tracking-[0.2em] uppercase">Email</span>
              <span class="text-primary font-medium group-hover:text-accent transition-colors duration-300 break-words">paul.thomas.stras@gmail.com</span>
            </div>
          </a>

          <div class="flex gap-3">
            <a href="https://github.com/PLRpower" target="_blank" rel="noopener noreferrer" 
               class="flex items-center gap-2 px-4 py-2.5 border border-white/[0.04] light:border-black/[0.04] bg-white/[0.01] light:bg-black/[0.01] font-mono text-[0.75rem] text-secondary/60 no-underline hover:text-accent hover:border-accent/15 hover:bg-accent/[0.03] transition-all duration-300">
              <Icon name="uil:github" size="16px" />
              Github
            </a>
            <a href="https://www.linkedin.com/in/paul-thomas-strasbourg/" target="_blank" rel="noopener noreferrer" 
               class="flex items-center gap-2 px-4 py-2.5 border border-white/[0.04] light:border-black/[0.04] bg-white/[0.01] light:bg-black/[0.01] font-mono text-[0.75rem] text-secondary/60 no-underline hover:text-accent hover:border-accent/15 hover:bg-accent/[0.03] transition-all duration-300">
              <Icon name="uil:linkedin" size="16px" />
              LinkedIn
            </a>
          </div>
        </div>

        <!-- Contact form -->
        <form class="flex flex-col gap-4 p-6 md:p-8 border border-white/[0.03] light:border-black/[0.03] bg-white/[0.01] light:bg-black/[0.01]" @submit.prevent="handleContactSubmit">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="relative">
              <input type="text" id="name" name="name" placeholder=" " autocomplete="name" required 
                class="w-full bg-transparent border border-white/[0.06] light:border-black/[0.06] px-4 py-3 font-sans text-sm text-primary outline-none transition-all duration-400 focus:border-accent/30 focus:bg-accent/[0.01] placeholder-shown:border-white/[0.06] light:border-black/[0.06] peer" />
              <label for="name" class="absolute left-4 top-3 text-secondary/40 text-sm transition-all duration-300 pointer-events-none peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-[0.65rem] peer-focus:bg-[#030303] peer-focus:px-2 peer-focus:text-accent peer-focus:font-mono peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:bg-[#030303] peer-[:not(:placeholder-shown)]:px-2">Name</label>
            </div>
            <div class="relative">
              <input type="email" id="email" name="email" placeholder=" " autocomplete="email" required 
                class="w-full bg-transparent border border-white/[0.06] light:border-black/[0.06] px-4 py-3 font-sans text-sm text-primary outline-none transition-all duration-400 focus:border-accent/30 focus:bg-accent/[0.01] placeholder-shown:border-white/[0.06] light:border-black/[0.06] peer" />
              <label for="email" class="absolute left-4 top-3 text-secondary/40 text-sm transition-all duration-300 pointer-events-none peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-[0.65rem] peer-focus:bg-[#030303] peer-focus:px-2 peer-focus:text-accent peer-focus:font-mono peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:bg-[#030303] peer-[:not(:placeholder-shown)]:px-2">Email</label>
            </div>
          </div>
          <div class="relative">
            <textarea id="message" name="message" rows="5" placeholder=" " required
              class="w-full bg-transparent border border-white/[0.06] light:border-black/[0.06] px-4 py-3 font-sans text-sm text-primary outline-none transition-all duration-400 focus:border-accent/30 focus:bg-accent/[0.01] placeholder-shown:border-white/[0.06] light:border-black/[0.06] peer resize-none"></textarea>
            <label for="message" class="absolute left-4 top-3 text-secondary/40 text-sm transition-all duration-300 pointer-events-none peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-[0.65rem] peer-focus:bg-[#030303] peer-focus:px-2 peer-focus:text-accent peer-focus:font-mono peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:bg-[#030303] peer-[:not(:placeholder-shown)]:px-2">Your Message</label>
          </div>
          
          <button type="submit" :disabled="isSubmitting"
            class="flex items-center justify-center gap-3 py-4 font-mono text-sm cursor-pointer transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed group/btn bg-[#2dd4bf]/[0.08] border border-[#2dd4bf]/30 text-accent hover:bg-[#2dd4bf]/[0.15] hover:border-[#2dd4bf]/50">
            <span v-if="!isSubmitting">Send Message</span>
            <span v-else>Sending...</span>
            <svg v-if="!isSubmitting" class="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            <Icon v-else name="line-md:loading-twotone-loop" size="18px" />
          </button>
          
          <div v-if="submitStatus === 'success'" class="flex items-center justify-center gap-2 mt-2 text-accent font-mono text-sm">
            <Icon name="uil:check-circle" size="16px" />
            Message sent successfully!
          </div>
          <div v-if="submitStatus === 'error'" class="flex items-center justify-center gap-2 mt-2 text-red-400 font-mono text-sm">
            <Icon name="uil:exclamation-triangle" size="16px" />
            An error occurred. Please try again.
          </div>
        </form>
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
