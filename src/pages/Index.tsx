import { useEffect, useMemo, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { Hero } from "@/components/Hero"
import { AboutSection } from "@/components/AboutSection"
import { LocationsGallery } from "@/components/LocationsGallery"
import { MenuSection } from "@/components/MenuSection"
import { Footer } from "@/components/Footer"
import { site } from "@/lib/site"

interface Cliente {
  id: string
  slug: string
  nombre_restaurante: string
  tagline: string | null
  url_imagen_hero: string | null
  telefono?: string | null
  direccion?: string | null
  instagram?: string | null
  facebook?: string | null
  // agrega aquí cualquier otro campo que tengas en tu tabla
}

const Index = () => {
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [loading, setLoading] = useState(true)

  // 1) Resolver el slug de forma robusta
  const resolvedSlug = useMemo(() => {
    // a) .env (Vite): VITE_CLIENT_SLUG=asador-don-jorge
    const envSlug = (import.meta as any).env?.VITE_CLIENT_SLUG as string | undefined

    // b) subdominio: asador.midominio.com -> "asador"
    let subdomainSlug: string | undefined
    if (typeof window !== "undefined") {
      const host = window.location.hostname // p.ej. asador-don-jorge.vercel.app
      const parts = host.split(".")
      // heurística: si tenés algo como "asador-don-jorge.vercel.app" o "asador.midominio.com"
      if (parts.length >= 3) subdomainSlug = parts[0]
      // si usás dominio propio tipo "asador-don-jorge.com", podés mapearlo distinto
    }

    // c) fallback al template
    return (envSlug || subdomainSlug || site.projectSlug || "template").toLowerCase()
  }, [])

  // 2) Cargar datos del cliente desde Supabase (si existe)
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function fetchCliente() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("clientes")
          .select("*")
          .eq("slug", resolvedSlug)
          .single()

        if (error) {
          console.warn("[Supabase] clientes.single error:", error.message)
        }
        if (!isMounted) return
        setCliente(data ?? null)
      } catch (e: any) {
        console.warn("[Supabase] fetchCliente exception:", e?.message || e)
        if (isMounted) setCliente(null)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchCliente()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [resolvedSlug])

  // 3) Derivar props visuales mezclando Supabase y site.config.ts (fallback)
  const nombre = cliente?.nombre_restaurante || site.siteTitle
  const tagline = (cliente?.tagline ?? site.description) || ""
  const heroUrl = cliente?.url_imagen_hero || site.heroImage

  // (Opcional) actualizar título del documento
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = nombre
    }
  }, [nombre])

  // 4) Estados de carga / vacío
  if (loading && !cliente) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-xl text-muted-foreground">Cargando…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero
        nombre={nombre}
        tagline={tagline}
        imagenUrl={heroUrl || undefined}
      />

      <AboutSection />

      {/* Sólo si hay cliente válido mostramos secciones que dependen de su id */}
      {cliente?.id ? (
        <>
          <LocationsGallery clienteId={cliente.id} />
          <MenuSection clienteId={cliente.id} />
        </>
      ) : (
        <div className="mx-auto max-w-5xl p-6 text-sm text-muted-foreground">
          {/* Fallback simple cuando no hay registro en Supabase */}
          Este sitio está usando los textos e imágenes del template por defecto.
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Index
