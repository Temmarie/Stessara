// =============================================================
// STESSARA — WhatsApp helpers
// Centralised so the phone number is easy to swap.
// =============================================================

// TODO: replace with the brand's actual WhatsApp number.
export const WHATSAPP_NUMBER = '2348000000000'; // placeholder

function urlEncode(s = '') {
  return encodeURIComponent(s);
}

/** Open WhatsApp with a plain message. */
export function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${urlEncode(message)}`;
}

/** Compose a "send this bag to WhatsApp" message. */
export function bagMessage({ bag, variant, price }) {
  return (
    `Hello STESSARA, I'd like to order:\n\n` +
    `• Bag: ${bag.name}\n` +
    `• Variant: ${variant?.name ?? 'Standard'}\n` +
    `• Price: ${price}\n\n` +
    `Please confirm availability and delivery to my address. Thank you.`
  );
}

/** Compose a custom-order message from the form. */
export function customOrderMessage({ name, contact, style, palette, occasion, deadline, notes }) {
  const paletteText = Array.isArray(palette) ? palette.join(', ') : palette;
  return (
    `Hello STESSARA — Custom Order Request\n\n` +
    `• Name: ${name}\n` +
    `• Contact: ${contact}\n` +
    `• Preferred bag style: ${style}\n` +
    `• Colour palette: ${paletteText}\n` +
    `• Occasion: ${occasion}\n` +
    `• Deadline: ${deadline}\n` +
    `• Notes: ${notes}\n\n` +
    `Looking forward to hearing from you.`
  );
}

/** Compose a full cart order message. */
export function cartOrderMessage({ items, customer }) {
  const lines = items.map((it, i) => {
    const v = it.variant?.name ? ` (${it.variant.name})` : '';
    return `  ${i + 1}. ${it.name}${v} × ${it.qty} — ${it.priceLabel}`;
  }).join('\n');

  return (
    `Hello STESSARA — I'd like to place an order:\n\n` +
    `${lines}\n\n` +
    `Subtotal: ${items.reduce((s, it) => s + it.price * it.qty, 0).toLocaleString('en-NG')} NGN\n\n` +
    `— Delivery details —\n` +
    `• Name: ${customer.name}\n` +
    `• Phone: ${customer.phone}\n` +
    `• Address: ${customer.address}\n` +
    `• City: ${customer.city}\n` +
    `• State: ${customer.state}\n\n` +
    `Please confirm and share payment details. Thank you.`
  );
}
