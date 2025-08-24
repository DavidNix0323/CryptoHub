// app/_placeholder.tsx
export default function Placeholder({ title }: { title: string }) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground">This page is coming soon.</p>
        </div>
      </div>
      
    );
    
  }
  