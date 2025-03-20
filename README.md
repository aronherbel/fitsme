# 📱 Outfit Creator App

## Projektbeschreibung

Die Outfit Creator App ermöglicht es Nutzern, individuelle Outfits zusammenzustellen, indem sie Oberteile, Hosen und Schuhe aus einer eigenen Bildsammlung auswählen. Für jedes Kleidungsstück gibt es eine Kachel, in der mehrere Bilder horizontal durchgeswipt werden können. Neue Kleidungsstücke können per Plus-Button als Bild hinzugefügt werden. Zusammengestellte Outfits können durch ein Herz-Icon als Favoriten markiert und später auf einem separaten Screen angezeigt werden.

---

## ✅ Funktionale Anforderungen

### 1. Outfit-Zusammenstellung (OutfitBuilderScreen)
- Anzeige von drei Kacheln:
  - **Obere Kachel** für Oberteile
  - **Mittlere Kachel** für Hosen
  - **Untere Kachel** für Schuhe
- In jeder Kachel:
  - Mehrere Kleidungsstücke als Bilder anzeigen
  - Möglichkeit, horizontal zu swipen, um zwischen den Bildern zu wechseln
  - **Plus-Button**, um neue Kleidungsstücke per Bild (Kamera oder Galerie) hinzuzufügen
- **Favorite-Button (Herz)**, um das aktuelle Outfit als Favorit zu speichern

---

### 2. Favoritenverwaltung (FavoritesScreen)
- Anzeige aller gespeicherten Lieblings-Outfits
- Outfits werden in der gleichen Struktur (Oberteil, Hose, Schuhe) dargestellt wie beim Zusammenstellen
- Jedes Outfit zeigt die jeweiligen Bilder der Kleidungsstücke an

---

### 3. Bildverwaltung
- Hochladen von Bildern für Kleidungsstücke über Kamera oder Galerie
- Speicherung der Bilder lokal in der App

---

### 4. Navigation
- Wechsel zwischen dem OutfitBuilderScreen und dem FavoritesScreen mittels **React Navigation**
