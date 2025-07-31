/**
 * Adjusts slider values so their sum is 100, respecting frozen sliders.
 */
export function adjustSlidersToSum100(
  sliderValue: Record<string, number>,
  frozenAcquirers: Record<string, boolean>,
  acquirersData: Record<string, any>,
  changedKey: string,
  newValue: number
): Record<string, number> {
  const allKeys = Object.keys(acquirersData);
  const frozenKeys = allKeys.filter((k) => frozenAcquirers[k]);
  const unfrozenKeys = allKeys.filter(
    (k) => !frozenAcquirers[k] && k !== changedKey
  );
  // Always preserve frozen values
  const frozenSum = frozenKeys.reduce(
    (sum, k) => sum + (sliderValue[k] || 0),
    0
  );
  // Clamp newValue so frozen + changed never exceeds 100
  const clampedValue = Math.max(0, Math.min(newValue, 100 - frozenSum));
  let remaining = 100 - frozenSum - clampedValue;
  let newSliderValue: Record<string, number> = {};
  // Set frozen values
  frozenKeys.forEach((k) => {
    newSliderValue[k] = sliderValue[k] || 0;
  });
  // Set changed slider
  newSliderValue[changedKey] = clampedValue;
  if (unfrozenKeys.length === 0) {
    // Only this slider is unfrozen, it gets all remaining
    newSliderValue[changedKey] = 100 - frozenSum;
  } else {
    // Distribute remaining among other unfrozen sliders proportionally
    const currentSum = unfrozenKeys.reduce(
      (sum, k) => sum + (sliderValue[k] || 0),
      0
    );
    let distributed = 0;
    unfrozenKeys.forEach((k, i) => {
      let val;
      if (i === unfrozenKeys.length - 1) {
        val = Math.max(0, remaining - distributed);
      } else {
        const proportion =
          currentSum > 0
            ? (sliderValue[k] || 0) / currentSum
            : 1 / unfrozenKeys.length;
        val = Math.round(proportion * remaining);
        distributed += val;
      }
      newSliderValue[k] = val;
    });
  }
  return newSliderValue;
}

/**
 * Normalizes a key to lowercase.
 */
export function normalizeKey(key: string) {
  return key.toLowerCase();
}
