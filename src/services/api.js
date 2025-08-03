export const fetchLiftData = async () => {
  // Simulate delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        "Belly 1": [
          { ID: 'P1', Fl: '13', Alarm: '1', Door: '0' },
          { ID: 'P2', Fl: '5', Alarm: '0', Door: '1' },
          { ID: 'P3', Fl: '9', Alarm: '0', Door: '0' }
        ],
        "Belly 2": [
          { ID: 'P4', Fl: '1', Alarm: '1', Door: '1' },
          { ID: 'P5', Fl: '6', Alarm: '0', Door: '0' }
        ],
        "Belly 3": [
          { ID: 'P6', Fl: '12', Alarm: '0', Door: '1' }
        ],
        "Belly 4": [
          { ID: 'P1', Fl: '8', Alarm: '0', Door: '0' },
          { ID: 'P2', Fl: '15', Alarm: '1', Door: '1' },
          { ID: 'P3', Fl: '3', Alarm: '0', Door: '0' }
        ]
      });
    }, 500); // optional delay to simulate API
  });
};