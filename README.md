# 📱 FitsMe Outfit Creator App

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
  - **Lösch-Button**, um einzelne Kleidungsstücke zu entfernen
- **Favorite-Button (Herz)**, um das aktuelle Outfit als Favorit zu speichern
  - Der Button wird nur angezeigt, wenn in allen drei Kategorien ein Kleidungsstück ausgewählt ist
  - Bei Klick wird das aktuell zusammengestellte Outfit (genau die sichtbaren Bilder) als Favorit gespeichert

---

### 2. Favoritenverwaltung (FavoritesScreen)
- Anzeige aller gespeicherten Lieblings-Outfits im Carousel-Format
- Outfits werden in der gleichen Struktur (Oberteil, Hose, Schuhe) dargestellt wie beim Zusammenstellen
- Horizontales Swipen zwischen den gespeicherten Outfit-Kombinationen
- Jedes Outfit kann über den Lösch-Button aus den Favoriten entfernt werden
- Leerer Zustand mit Hinweis, wenn noch keine Favoriten vorhanden sind

---

### 3. Bildverwaltung
- Hochladen von Bildern für Kleidungsstücke über Kamera oder Galerie
- Auswahl zwischen Kamera und Galerie über Dialog
- Einzelne Löschung von Bildern mit Bestätigungsdialog
- Speicherung der Bilder lokal in der App

---

### 4. Navigation
- Wechsel zwischen dem OutfitBuilderScreen und dem FavoritesScreen mittels **React Navigation**
- Tab-basierte Navigation für einfachen Zugriff auf alle Bereiche der App

---

### 5. State Management
- Verwendung der Context API für das App-weite State Management
- Persistenz der Favoriten-Outfits während der App-Nutzung
- Zentrales Management der Benutzerdaten

---

## 🛠️ Technische Implementierung

### Framework und Bibliotheken
- **React Native** als Framework
- **Expo** für einfache Entwicklung und Zugriff auf native Features
- **React Navigation** für die App-Navigation
- **Expo Image Picker** für Kamera- und Galerie-Zugriff

### Komponenten-Struktur
- **ClothingCarousel**: Wiederverwendbare Komponente zum Anzeigen und Scrollen durch Kleidungsstücke
- **OutfitCarousel**: Komponente zum Anzeigen kompletter Outfits auf dem Favoriten-Screen
- **UpperClothing, Trousers, Shoes**: Spezifische Komponenten für die jeweiligen Kleidungskategorien

### State Management
- **FavoriteOutfitsContext**: Kontext für die Verwaltung der favorisierten Outfits
- **UserContext**: Kontext für Benutzerinformationen und Authentifizierung

