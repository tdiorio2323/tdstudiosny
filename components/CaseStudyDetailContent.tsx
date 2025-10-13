// components/CaseStudyDetailContent.tsx
import React from "react";
import { type Client } from "@/lib/clients-data"; // Ensure this path is correct
import { GlassCard } from "@/components/glass-card";
import { Instagram, Facebook, Twitter, Linkedin, Globe } from "lucide-react";
import Image from "next/image";

type CaseStudyDetailContentProps = {
  client: Client;
  isModal?: boolean; // Flag to adjust styling if used in the modal
};

// Helper function to render a social link button
const SocialLinkButton = ({ href, Icon, name }: { href: string; Icon: React.ComponentType<any>, name: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-neutral-900/80 border border-white/20 rounded-lg text-white hover:bg-neutral-900/90 transition-colors min-h-[44px]"
    >
        <Icon className="w-4 h-4" />
        {name}
    </a>
);

export function CaseStudyDetailContent({ client, isModal = false }: CaseStudyDetailContentProps) {
  // Use a more compact layout for the modal
  const containerClass = isModal ? "space-y-8" : "space-y-12";
  const headingClass = isModal ? "text-2xl font-bold text-white mb-4" : "text-3xl font-bold text-white mb-6";

  return (
    <div className={containerClass}>
      
      {/* Description */}
      {client.description && (
        <div>
          <h2 className={headingClass}>The Challenge & Solution</h2>
          <p className="text-white leading-relaxed">{client.description}</p>
        </div>
      )}

      {/* Client Links (Website & Social) */}
      {(client.websiteUrl || client.socialLinks) && (
        <div>
            <h3 className={headingClass}>Client Links</h3>
            <div className="flex flex-wrap gap-3">
                {client.websiteUrl && (
                    <SocialLinkButton 
                        href={client.websiteUrl} 
                        Icon={Globe} 
                        name="Website" 
                    />
                )}
                {client.socialLinks?.instagram && (
                    <SocialLinkButton 
                        href={client.socialLinks.instagram} 
                        Icon={Instagram} 
                        name="Instagram" 
                    />
                )}
                {client.socialLinks?.facebook && (
                    <SocialLinkButton 
                        href={client.socialLinks.facebook} 
                        Icon={Facebook} 
                        name="Facebook" 
                    />
                )}
                {client.socialLinks?.twitter && (
                    <SocialLinkButton 
                        href={client.socialLinks.twitter} 
                        Icon={Twitter} 
                        name="Twitter" 
                    />
                )}
                {client.socialLinks?.linkedin && (
                    <SocialLinkButton 
                        href={client.socialLinks.linkedin} 
                        Icon={Linkedin} 
                        name="LinkedIn" 
                    />
                )}
            </div>
        </div>
      )}

      {/* Results */}
      {client.results.length > 0 && (
        <div>
          <h2 className={headingClass}>Key Results</h2>
          <ul className="space-y-3">
            {client.results.map((result, index) => (
              <li key={index} className="flex items-start text-white">
                <span className={`mr-3 mt-1 ${isModal ? 'text-green-400' : 'text-luxury-gold'}`}>✓</span>
                <p>{result}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gallery */}
      {client.gallery.length > 0 && (
        <div>
          <h2 className={headingClass}>Project Gallery</h2>
          <div className={`grid gap-6 ${isModal ? 'md:grid-cols-2' : 'md:grid-cols-2'}`}>
            {client.gallery.map((image, index) => (
              <div 
                key={index} 
                className="relative aspect-video overflow-hidden rounded-lg border border-white/10"
              >
                <Image
                  src={image}
                  alt={`${client.name} gallery ${index + 1}`}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw" // Simplify sizes for now
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonial */}
      {client.testimonial && (
        <div>
          <h2 className={headingClass}>Client Testimonial</h2>
          <GlassCard className="p-8">
            <p className="text-white italic text-xl mb-6">"{client.testimonial.quote}"</p>
            <p className="text-white font-semibold text-lg">{client.testimonial.author}</p>
            <p className="text-white/80 text-base">{client.testimonial.position}</p>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// Exporting the helper component for internal use if needed
export { SocialLinkButton };
