class F1SoundEngine {
  private audioContext: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private createOscillator(frequency: number, type: OscillatorType = 'sine', duration: number = 0.1) {
    if (!this.audioContext) return null;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    return { oscillator, gainNode };
  }

  // Engine rev sound for hover effects
  playEngineRev() {
    if (!this.audioContext) return;

    const { oscillator } = this.createOscillator(200, 'sawtooth', 0.3) || {};
    if (!oscillator) return;

    oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.15);
    oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.3);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }

  // Pit radio beep for navigation
  playRadioBeep() {
    if (!this.audioContext) return;

    const { oscillator } = this.createOscillator(800, 'square', 0.1) || {};
    if (!oscillator) return;

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  // DRS activation sound for form submissions
  playDRSActivation() {
    if (!this.audioContext) return;

    const { oscillator: osc1 } = this.createOscillator(600, 'sine', 0.4) || {};
    const { oscillator: osc2 } = this.createOscillator(900, 'sine', 0.4) || {};

    if (osc1 && osc2) {
      osc1.start(this.audioContext.currentTime);
      osc1.stop(this.audioContext.currentTime + 0.4);
      
      osc2.start(this.audioContext.currentTime + 0.1);
      osc2.stop(this.audioContext.currentTime + 0.5);
    }
  }

  // Gear shift sound for section transitions
  playGearShift() {
    if (!this.audioContext) return;

    const { oscillator } = this.createOscillator(150, 'sawtooth', 0.2) || {};
    if (!oscillator) return;

    oscillator.frequency.exponentialRampToValueAtTime(300, this.audioContext.currentTime + 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(150, this.audioContext.currentTime + 0.2);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.2);
  }

  // Turbo boost sound for project card hovers
  playTurboBoost() {
    if (!this.audioContext) return;

    const { oscillator } = this.createOscillator(100, 'sawtooth', 0.5) || {};
    if (!oscillator) return;

    oscillator.frequency.exponentialRampToValueAtTime(500, this.audioContext.currentTime + 0.3);
    oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.5);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.5);
  }

  // Success sound for form completion
  playSuccess() {
    if (!this.audioContext) return;

    const frequencies = [523, 659, 784]; // C, E, G chord
    frequencies.forEach((freq, index) => {
      const result = this.createOscillator(freq, 'sine', 0.6);
      if (result?.oscillator && this.audioContext) {
        result.oscillator.start(this.audioContext.currentTime + index * 0.1);
        result.oscillator.stop(this.audioContext.currentTime + 0.6 + index * 0.1);
      }
    });
  }
}

export const f1SoundEngine = new F1SoundEngine();

export const playF1Sound = (soundType: string) => {
  try {
    switch (soundType) {
      case 'engine-rev':
        f1SoundEngine.playEngineRev();
        break;
      case 'radio-beep':
        f1SoundEngine.playRadioBeep();
        break;
      case 'drs-activation':
        f1SoundEngine.playDRSActivation();
        break;
      case 'gear-shift':
        f1SoundEngine.playGearShift();
        break;
      case 'turbo-boost':
        f1SoundEngine.playTurboBoost();
        break;
      case 'success':
        f1SoundEngine.playSuccess();
        break;
      default:
        console.log('Unknown F1 sound type:', soundType);
    }
  } catch (error) {
    // Silently handle audio errors
    console.log('Audio not available');
  }
};

export default f1SoundEngine;
