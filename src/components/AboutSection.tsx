export const AboutSection = () => {
  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          About Our Restaurant
        </h2>
        <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
          <div>
            <p className="mb-4 leading-relaxed">
              Welcome to our authentic Spanish tapas bar, where tradition meets modern culinary excellence. 
              For over two decades, we've been serving the finest selection of traditional Spanish dishes, 
              crafted with passion and the freshest ingredients.
            </p>
            <p className="leading-relaxed">
              Our chefs bring generations of Spanish culinary heritage to every plate, ensuring an 
              unforgettable dining experience that transports you straight to the heart of Spain.
            </p>
          </div>
          <div>
            <p className="mb-4 leading-relaxed">
              From our signature Jamón Ibérico to our perfectly seasoned Gambas al Ajillo, each dish 
              tells a story of Spanish culture and gastronomy. We pride ourselves on using only the 
              highest quality ingredients, imported directly from Spain.
            </p>
            <p className="leading-relaxed">
              Join us for an authentic taste of Spain, where every meal is a celebration and every 
              guest becomes part of our family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
