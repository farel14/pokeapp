import convert from 'convert-units';

export function mmToFeetDecimalInches(mm:number, precision = 2) {
  const totalInches = convert(mm).from('mm').to('in'); // Convert mm → in

  const feet = Math.floor(totalInches / 12);                  // Get whole feet
  const remainingInches = totalInches - feet * 12;            // Get remaining inches
  const inchesRounded = remainingInches.toFixed(precision);   // Round to 2 decimals

  const feetStr = feet ? `${feet}'` : '';
  const inchStr = `${inchesRounded}"`;

  return `${feetStr}${inchStr}`;
}
