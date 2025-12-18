import Image from "next/image";
import Link from "next/link";

export default function NavbarLogo() {
    return (
        <Link href="/" className="flex items-center">
            <div className="relative h-20 w-44">
                <Image
                    src="/FullLogo.png"
                    alt="Levere Electric"
                    fill
                    priority
                    sizes="176px"
                    className="object-contain pt-2"
                />
            </div>
        </Link>
    );
}
