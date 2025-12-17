import Image from "next/image";
import Link from "next/link";

export default function NavbarLogo() {
    return (
        <Link href="/" className="flex items-center">
            <div className="relative h-20 w-44 mt-5">
                <Image
                    src="/FullLogo.png"
                    alt="Levere Electric"
                    fill
                    priority
                    sizes="176px"
                    className="object-contain"
                />
            </div>
        </Link>
    );
}
