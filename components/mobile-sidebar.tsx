'use client';

import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/sidebar';

function MobileSidebar() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="md:hidden" variant="ghost" size="icon">
					<MenuIcon />
					<span className="sr-only">Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent className="p-0" side="left">
				<Sidebar />
			</SheetContent>
		</Sheet>
	);
}

export default MobileSidebar;
