import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import patatrasBravas from "@/assets/patatas-bravas.jpg";
import jamonIberico from "@/assets/jamon-iberico.jpg";
import gambasAjillo from "@/assets/gambas-ajillo.jpg";
import pulpoGallega from "@/assets/pulpo-gallega.jpg";

interface MenuItem {
  id: string;
  plato: string;
  descripcion: string | null;
  precio: number;
  url_imagen: string | null;
  orden: number;
}

const defaultImages = [
  patatrasBravas,
  jamonIberico,
  gambasAjillo,
  pulpoGallega,
];

const MenuCard = ({ item, index }: { item: MenuItem; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={item.url_imagen || defaultImages[index % defaultImages.length]}
          alt={item.plato}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-foreground">{item.plato}</h3>
          <span className="text-primary font-bold text-xl">${item.precio}</span>
        </div>
        {item.descripcion && (
          <p className="text-muted-foreground text-sm">{item.descripcion}</p>
        )}
      </div>
    </motion.div>
  );
};

export const MenuSection = ({ clienteId }: { clienteId: string }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const { data } = await supabase
        .from("menu_items")
        .select("*")
        .eq("cliente_id", clienteId)
        .order("orden");

      if (data) {
        setMenuItems(data);
      }
    };

    fetchMenuItems();
  }, [clienteId]);

  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-4 text-foreground"
        >
          Our Menu
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Discover our selection of authentic Spanish tapas, prepared with traditional recipes and the finest ingredients
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
