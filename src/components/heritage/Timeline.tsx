import { heritageItems } from '@/data/heritage';
import TimelineItem from './TimelineItem';

export default function Timeline() {
 if (!heritageItems || heritageItems.length === 0) {
 return (
 <div className="text-center py-16 text-neutral-600 text-xl font-body">
 <p>No heritage items available.</p>
 </div>
 );
 }

 return (
 <div className="relative wrap overflow-hidden p-4 md:p-10 h-full">
 {/* Center Line */}
 <div
 className="absolute h-full border-dashed border-neutral-300 
 left-4 md:left-1/2"
 />

 {/* Timeline Items */}
 <div className="space-y-8">
 {heritageItems.map((item, index) => (
 <div
 key={item.id}
 className={`flex items-center w-full ${
 index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
 }`}
 >
 <TimelineItem item={item} isLeft={index % 2 === 0} />
 </div>
 ))}
 </div>
 </div>
 );
}