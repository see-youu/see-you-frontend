import { useRouter } from "next/navigation";

export function useNavigation() {
  const router = useRouter();

  const goBack = (): void => {
    router.back();
  };

  const goToPage = (page: string): void => {
    router.push(page);
  };
  return { goBack, goToPage };
}
