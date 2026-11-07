export function slideWindow(slides,index) {
  if (!Number.isInteger(index) || index<0 || index>=slides.length) throw new RangeError('Invalid slide index');
  const start=slides.slice(0,index).reduce((sum,slide)=>sum+slide.duration,0);
  return {start,end:start+slides[index].duration};
}
