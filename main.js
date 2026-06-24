document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Management (Light/Dark Mode Toggle) ---
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Initialize theme
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlElement.classList.add(savedTheme === 'dark' ? 'theme-dark' : 'theme-light');
  } else {
    // If no saved theme, let the browser's light-dark() handle it naturally,
    // but synchronize our toggle icons state.
    htmlElement.classList.add(systemPrefersDark ? 'theme-dark' : 'theme-light');
  }

  updateToggleIcon();

  themeToggle.addEventListener('click', () => {
    if (htmlElement.classList.contains('theme-dark')) {
      htmlElement.classList.remove('theme-dark');
      htmlElement.classList.add('theme-light');
      localStorage.setItem('theme', 'light');
    } else {
      htmlElement.classList.remove('theme-light');
      htmlElement.classList.add('theme-dark');
      localStorage.setItem('theme', 'dark');
    }
    updateToggleIcon();
  });

  function updateToggleIcon() {
    const isDark = htmlElement.classList.contains('theme-dark') || 
                   (!htmlElement.classList.contains('theme-light') && systemPrefersDark);
    
    // Moon SVG for light mode, Sun SVG for dark mode
    if (isDark) {
      themeToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41zm-12.37 12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41z"/>
        </svg>
      `;
      themeToggle.setAttribute('aria-label', 'Ativar modo claro');
    } else {
      themeToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10 0-4.8 3.5-8.9 8.2-9.8.6-.1 1.2.3 1.3.9.1.6-.3 1.2-.9 1.3-3.7.7-6.4 4-6.4 7.8 0 4.4 3.6 8 8 8 3.8 0 7.1-2.7 7.8-6.4.1-.6.7-1 1.3-.9.6.1 1 .7.9 1.3-.9 4.7-5 8.2-9.8 8.2z"/>
        </svg>
      `;
      themeToggle.setAttribute('aria-label', 'Ativar modo escuro');
    }
  }

  // --- 2. VR Simulator Interactive Logic ---
  const simSteps = [
    {
      title: "1. Calibração do Solo",
      desc: "Insira o medidor digital de pH na área de cultivo virtual. O HUD indica pH 5.2. O produtor aprende instantaneamente que o solo está ácido e necessita de calagem antes do plantio.",
      hudLeft: "PH: <span>5.2 (Ácido)</span>",
      hudRight: "UMIDADE: <span>74%</span>",
      visualColor: "linear-gradient(135deg, rgba(8, 24, 13, 0.95), rgba(4, 13, 6, 0.95))",
      instruction: "Alinhe a retícula e pressione GATILHO para inserir o sensor de solo."
    },
    {
      title: "2. Cálculo de Calagem",
      desc: "No console virtual integrado, o produtor calcula a dosagem necessária de calcário com base na área e acidez. O simulador ensina a quantidade correta para neutralizar o alumínio tóxico.",
      hudLeft: "CALCÁRIO: <span>+1.2t / ha</span>",
      hudRight: "ALUMÍNIO: <span>Reduzindo</span>",
      visualColor: "linear-gradient(rgba(11, 60, 29, 0.9), rgba(4, 13, 6, 0.9)), repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0 10px, transparent 0 20px)",
      instruction: "Selecione o corretivo no painel digital para iniciar a dispersão."
    },
    {
      title: "3. Abertura e Adubação de Covas",
      desc: "Pratique a escavação simulada seguindo as dimensões ideais de 40x40x40cm. Adicione a mistura recomendada de adubo fosfatado e composto orgânico, garantindo o espaçamento correto entre as mudas.",
      hudLeft: "COVA: <span>40x40x40cm</span>",
      hudRight: "ADUBO: <span>Fosfato + Orgânico</span>",
      visualColor: "linear-gradient(rgba(4, 13, 6, 0.8), rgba(4, 13, 6, 0.95)), repeating-conic-gradient(rgba(0,0,0,0.1) 0 25%, transparent 0 50%)",
      instruction: "Garanta a profundidade exata da cova usando o marcador holográfico."
    },
    {
      title: "4. Irrigação e Monitoramento",
      desc: "Estabeleça o sistema de irrigação por microaspersão de forma eficiente. O produtor testa o fluxo de água e monitora a absorção em tempo real, garantindo o pegamento ideal da muda na Amazônia Legal.",
      hudLeft: "VAZÃO: <span>4.2 L / h</span>",
      hudRight: "ABSORÇÃO: <span>Excelente (98%)</span>",
      visualColor: "linear-gradient(135deg, rgba(4, 13, 6, 0.9), rgba(0, 245, 141, 0.2))",
      instruction: "Abra a válvula principal no painel e verifique a taxa de umidade."
    }
  ];

  let currentStep = 0;
  const simContent = document.getElementById('sim-content');
  const simStepTitle = document.getElementById('sim-step-title');
  const simStepDesc = document.getElementById('sim-step-desc');
  const hudLeft = document.getElementById('hud-left');
  const hudRight = document.getElementById('hud-right');
  const simInstruction = document.getElementById('sim-instruction');
  const prevBtn = document.getElementById('sim-prev');
  const nextBtn = document.getElementById('sim-next');
  const simDots = document.querySelectorAll('.sim-dot');

  function updateSimulator(index) {
    const step = simSteps[index];
    
    // Fade out main content brief and switch
    simStepTitle.style.opacity = '0';
    simStepDesc.style.opacity = '0';
    
    setTimeout(() => {
      simStepTitle.textContent = step.title;
      simStepDesc.textContent = step.desc;
      hudLeft.innerHTML = step.hudLeft;
      hudRight.innerHTML = step.hudRight;
      simInstruction.textContent = step.instruction;
      simContent.style.backgroundImage = step.visualColor;
      
      simStepTitle.style.opacity = '1';
      simStepDesc.style.opacity = '1';
    }, 200);

    // Update dot active state
    simDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });

    // Handle button availability
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === simSteps.length - 1;
    
    if (index === simSteps.length - 1) {
      nextBtn.innerHTML = `Concluir <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/></svg>`;
    } else {
      nextBtn.innerHTML = `Próximo Passo <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/></svg>`;
    }
  }

  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      updateSimulator(currentStep);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentStep < simSteps.length - 1) {
      currentStep++;
      updateSimulator(currentStep);
    } else {
      // Completed simulation run-through, restart
      currentStep = 0;
      updateSimulator(currentStep);
    }
  });

  // Initialize simulation
  updateSimulator(currentStep);

  // --- 3. Scroll Reveal Fallback (For older or incompatible browsers) ---
  if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    const reveals = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
          entry.target.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
          observer.unobserve(entry.target); // Trigger animation once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before entering viewport fully
    });

    reveals.forEach(reveal => {
      // Initial state prior to observer firing
      reveal.style.opacity = '0';
      reveal.style.transform = 'translateY(30px) scale(0.95)';
      revealObserver.observe(reveal);
    });
  }

  // --- 4. Interactive header state on scroll ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
      header.style.backgroundColor = 'var(--bg-surface-trans)';
      header.style.backdropFilter = 'blur(12px)';
    } else {
      header.classList.remove('header-scrolled');
      header.style.backgroundColor = 'transparent';
      header.style.backdropFilter = 'none';
    }
  });
});
