import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { LocationsGallery } from "@/components/LocationsGallery";
import { MenuSection } from "@/components/MenuSection";
import { Footer } from "@/components/Footer";

interface Cliente {
  id: string;
  nombre_restaurante: string;
  tagline: string | null;
  url_imagen_hero: string | null;
}

const Index = () => {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const slug = "import.meta.env.VITE_CLIENT_SLUG"; // En producción, esto vendría de la URL

  useEffect(() => {
    const fetchCliente = async () => {
      const { data } = await supabase
        .from("clientes")
        .select("*")
        .eq("slug", slug)
        .single();

      if (data) {
        setCliente(data);
      }
    };

    fetchCliente();
  }, [slug]);

  if (!cliente) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-xl text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero
        nombre={cliente.nombre_restaurante}
        tagline={cliente.tagline || ""}
        imagenUrl={cliente.url_imagen_hero || undefined}
      />
      <AboutSection />
      <LocationsGallery clienteId={cliente.id} />
      <MenuSection clienteId={cliente.id} />
      <Footer />
    </div>
  );
};

export default Index;
