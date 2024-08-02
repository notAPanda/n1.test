import { Context } from "hono";
import PDFDocument from "pdfkit";

export const pdf = async (c: Context) => {
  const name: string = c.req.query('name') || 'guest';

  const doc = new PDFDocument();
  doc.info.Title = "Test Document";
  doc.text(name);
  doc.end();

  c.header("Content-Disposition", 'inline; filename="my-custom-filename.pdf"')

  const buffer = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });
  
  return c.body(buffer);
};
