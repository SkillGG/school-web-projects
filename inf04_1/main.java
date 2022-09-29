import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

class M {
    public static int szukaj(int x, ArrayList<Integer> tablica) {
        return 0;
    }

    public static void main(String[] args) {
        ArrayList<Integer> tab = new ArrayList<Integer>();
        for (int x = 0; x < tab.size(); x++) {
            tab.set(x, new Random().nextInt(100));
        }
        Scanner scanner = new Scanner(System.in);
        int ktory = scanner.nextInt();
        ArrayList<Integer> kopia = tab;
        kopia.add(ktory);
        int id = szukaj(ktory, kopia);
    }

}