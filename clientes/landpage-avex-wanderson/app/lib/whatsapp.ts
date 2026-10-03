const WHATSAPP_NUMBER = "5594981992291";

/**
 * Builds a wa.me link with a pre-filled message, so the CTA opens straight
 * into a conversation instead of routing through Instagram DMs.
 */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_LINK = buildWhatsAppLink(
  "Olá! Quero estruturar minhas vendas com a AVEX."
);
