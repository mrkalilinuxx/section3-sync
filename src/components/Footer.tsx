import { GraduationCap, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-6 w-6" />
            <div>
              <h3 className="font-semibold">BCA Section 3</h3>
              <p className="text-sm opacity-80">Routine & Study Materials</p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end space-x-2 mb-1">
              <Mail className="h-4 w-4" />
              <a 
                href="mailto:rajdeepgupta010101@gmail.com" 
                className="hover:underline transition-colors"
              >
                rajdeepgupta010101@gmail.com
              </a>
            </div>
            <p className="text-sm opacity-80">
              © Danzer 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}