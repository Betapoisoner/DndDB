Table structure

---

### **Base Models**  
*(Abstract models for reusability)*

#### 1. **BaseEntity**  
| Field          | Type          | Description                   |
|----------------|---------------|-------------------------------|
| `name`         | Char          | Name of the entity.           |
| `description`  | Text          | Detailed description.         |

**Inherited By:**  
`Action`, `Alignment`, `Campaign`, `Dungeon`, `Event`, `Fauna`, `ImportantFigure`, `Inventory`, `Item`, `Monster`, `NPC`, `Patron`, `Region`, `Reward`, `Session`, `Shop`, `Skill`, `Spell`, `Town`, `World`.

---

#### 2. **CombatStats**  
| Field                | Type          | Description                          |
|----------------------|---------------|--------------------------------------|
| `armor_class`        | Integer       | Armor Class (AC).                   |
| `hit_points`         | Integer       | Total hit points.                   |
| `strength`           | Integer       | Strength score.                     |
| `dexterity`          | Integer       | Dexterity score.                    |
| `constitution`       | Integer       | Constitution score.                |
| `intelligence`       | Integer       | Intelligence score.                |
| `wisdom`             | Integer       | Wisdom score.                      |
| `charisma`           | Integer       | Charisma score.                    |
| `damage_resistances` | Char          | Types of damage resisted.          |
| `damage_immunities`  | Char          | Types of damage immunities.        |
| `condition_immunities` | Char        | Conditions the entity is immune to. |
| `armor_desc`         | Text          | Description of armor.              |

**Inherited By:**  
`Character`, `NPC`, `BBEG`, `Monster`, `Patron`.

---

#### 3. **Visual**  
| Field          | Type          | Description                   |
|----------------|---------------|-------------------------------|
| `photo`        | Binary        | Image/photo of the entity.    |
| `alignment_id` | Many2one      | Linked to `dnd.alignment`.    |

**Inherited By:**  
`Character`, `NPC`, `BBEG`, `Monster`, `ImportantFigure`, `Patron`.

---

#### 4. **InventoryBase**  
| Field          | Type          | Description                   |
|----------------|---------------|-------------------------------|
| `quantity`     | Integer       | Number of items.              |
| `value`        | Float         | Monetary value.               |
| `weight`       | Float         | Weight in pounds/kilograms.   |
| `rarity`       | Char          | Rarity (Common, Rare, etc.).  |

**Inherited By:**  
`Item`, `Reward`.

---

#### 5. **Location**  
| Field          | Type          | Description                   |
|----------------|---------------|-------------------------------|
| `map`          | Binary        | Map image.                    |
| `location`     | Char          | Geographical location.        |

**Inherited By:**  
`Dungeon`, `Region`, `Town`, `World`.

---

### **Regular Models**  
---

### **Action** (`dnd.action`)  
**Inherits:** `BaseEntity`  
| Field                | Type          | Relationship Target       |
|----------------------|---------------|---------------------------|
| `name`               | Char          | -                         |
| `damage`             | Integer       | -                         |
| `description`        | Text          | -                         |
| `is_legendary_action`| Boolean       | -                         |
| `npcs`               | Many2many     | `dnd.npc`                 |
| `bbegs`              | Many2many     | `dnd.bbeg`                |
| `monsters`           | Many2many     | `dnd.monster`             |

---

### **Alignment** (`dnd.alignment`)  
**Inherits:** `BaseEntity`  
| Field               | Type          | Relationship Target       |
|---------------------|---------------|---------------------------|
| `name`              | Char          | -                         |
| `description`       | Text          | -                         |
| `npcs`              | One2many      | `dnd.npc`                 |
| `bbegs`             | One2many      | `dnd.bbeg`                |
| `characters`        | One2many      | `dnd.character`           |
| `important_figures` | One2many      | `dnd.important_figure`    |
| `monsters`          | One2many      | `dnd.monster`             |
| `patrons`           | One2many      | `dnd.patron`              |

---

### **BBEG** (`dnd.bbeg`)  
**Inherits:** `BaseEntity`, `CombatStats`, `Visual`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `challenge_rating`     | Float         | -                         |
| `languages`            | Char          | -                         |
| `actions`              | Many2many     | `dnd.action`              |
| `dungeons`             | One2many      | `dnd.dungeon`             |
| `skills`               | Many2many     | `dnd.skill`               |
| `spells`               | Many2many     | `dnd.spell`               |
| `inventory_id`         | Many2one      | `dnd.inventory`           |

---

### **Campaign** (`dnd.campaign`)  
**Inherits:** `BaseEntity`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `current_date`         | Date          | -                         |
| `current_location`     | Char          | -                         |
| `status`               | Char          | -                         |
| `characters`           | Many2many     | `dnd.character`           |
| `sessions`             | One2many      | `dnd.session`             |
| `worlds`               | Many2many     | `dnd.world`               |

---

### **Character** (`dnd.character`)  
**Inherits:** `BaseEntity`, `CombatStats`, `Visual`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `class_type`           | Char          | -                         |
| `campaigns`            | Many2many     | `dnd.campaign`            |
| `patrons`              | Many2many     | `dnd.patron`              |
| `skills`               | Many2many     | `dnd.skill`               |
| `spells`               | Many2many     | `dnd.spell`               |
| `inventory_id`         | Many2one      | `dnd.inventory`           |

---

### **Dungeon** (`dnd.dungeon`)  
**Inherits:** `BaseEntity`, `Location`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `has_bbeg`             | Boolean       | -                         |
| `level_count`          | Integer       | -                         |
| `bbeg_id`              | Many2one      | `dnd.bbeg`                |
| `faunas`               | One2many      | `dnd.fauna`               |
| `regions`              | Many2many     | `dnd.region`              |

---

### **Event** (`dnd.event`)  
**Inherits:** `BaseEntity`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `date`                 | Datetime      | -                         |
| `session_id`           | Many2one      | `dnd.session`             |

---

### **Fauna** (`dnd.fauna`)  
**Inherits:** `BaseEntity`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `level`                | Integer       | -                         |
| `quantity`             | Integer       | -                         |
| `type`                 | Char          | -                         |
| `dungeon_id`           | Many2one      | `dnd.dungeon`             |
| `monsters`             | Many2many     | `dnd.monster`             |
| `region_id`            | Many2one      | `dnd.region`              |

---

### **ImportantFigure** (`dnd.important_figure`)  
**Inherits:** `BaseEntity`, `Visual`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `title`                | Char          | -                         |
| `alignment_id`         | Many2one      | `dnd.alignment`           |
| `town_id`              | Many2one      | `dnd.town`                |

---

### **Inventory** (`dnd.inventory`)  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `items`                | Many2many     | `dnd.item`                |

---

### **Item** (`dnd.item`)  
**Inherits:** `BaseEntity`, `InventoryBase`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `rarity`               | Char          | -                         |
| `type`                 | Char          | -                         |
| `rewards`              | One2many      | `dnd.reward`              |
| `inventories`          | Many2many     | `dnd.inventory`           |

---

### **Monster** (`dnd.monster`)  
**Inherits:** `BaseEntity`, `CombatStats`, `Visual`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `challenge_rating`     | Float         | -                         |
| `actions`              | Many2many     | `dnd.action`              |
| `faunas`               | Many2many     | `dnd.fauna`               |
| `skills`               | Many2many     | `dnd.skill`               |
| `spells`               | Many2many     | `dnd.spell`               |
| `inventory_id`         | Many2one      | `dnd.inventory`           |

---

### **NPC** (`dnd.npc`)  
**Inherits:** `BaseEntity`, `CombatStats`, `Visual`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `actions`              | Many2many     | `dnd.action`              |
| `skills`               | Many2many     | `dnd.skill`               |
| `spells`               | Many2many     | `dnd.spell`               |
| `town_id`              | Many2one      | `dnd.town`                |
| `inventory_id`         | Many2one      | `dnd.inventory`           |

---

### **Patron** (`dnd.patron`)  
**Inherits:** `BaseEntity`, `CombatStats`, `Visual`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `goals`                | Char          | -                         |
| `home_plane`           | Char          | -                         |
| `power_level`          | Integer       | -                         |
| `characters`           | Many2many     | `dnd.character`           |

---

### **Region** (`dnd.region`)  
**Inherits:** `BaseEntity`, `Location`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `climate`              | Char          | -                         |
| `dungeons`             | Many2many     | `dnd.dungeon`             |
| `faunas`               | One2many      | `dnd.fauna`               |
| `towns`                | One2many      | `dnd.town`                |
| `worlds`               | Many2many     | `dnd.world`               |

---

### **Reward** (`dnd.reward`)  
**Inherits:** `BaseEntity`, `InventoryBase`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `is_item`              | Boolean       | -                         |
| `item_id`              | Many2one      | `dnd.item`                |

---

### **Session** (`dnd.session`)  
**Inherits:** `BaseEntity`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `start_time`           | Datetime      | -                         |
| `end_time`             | Datetime      | -                         |
| `treasure_acquired`    | Char          | -                         |
| `xp_awarded`           | Integer       | -                         |
| `campaign_id`          | Many2one      | `dnd.campaign`            |
| `events`               | One2many      | `dnd.event`               |

---

### **Shop** (`dnd.shop`)  
**Inherits:** `BaseEntity`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `type`                 | Char          | -                         |
| `inventory_id`         | Many2one      | `dnd.inventory`           |
| `town_id`              | Many2one      | `dnd.town`                |

---

### **Skill** (`dnd.skill`)  
**Inherits:** `BaseEntity`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `description`          | Text          | -                         |
| `bbegs`                | Many2many     | `dnd.bbeg`                |
| `characters`           | Many2many     | `dnd.character`           |
| `monsters`             | Many2many     | `dnd.monster`             |
| `npcs`                 | Many2many     | `dnd.npc`                 |

---

### **Spell** (`dnd.spell`)  
**Inherits:** `BaseEntity`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `casting_time`         | Char          | -                         |
| `component`            | Char          | -                         |
| `duration`             | Char          | -                         |
| `range`                | Char          | -                         |
| `school`               | Char          | -                         |
| `bbegs`                | Many2many     | `dnd.bbeg`                |
| `characters`           | Many2many     | `dnd.character`           |
| `monsters`             | Many2many     | `dnd.monster`             |
| `npcs`                 | Many2many     | `dnd.npc`                 |

---

### **Town** (`dnd.town`)  
**Inherits:** `BaseEntity`, `Location`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `is_capital`           | Boolean       | -                         |
| `population`           | Integer       | -                         |
| `prosperity`           | Integer       | -                         |
| `important_figures`    | One2many      | `dnd.important_figure`    |
| `npcs`                 | One2many      | `dnd.npc`                 |
| `shops`                | One2many      | `dnd.shop`                |
| `region_id`            | Many2one      | `dnd.region`              |

---

### **World** (`dnd.world`)  
**Inherits:** `BaseEntity`, `Location`  
| Field                  | Type          | Relationship Target       |
|------------------------|---------------|---------------------------|
| `calendar`             | Char          | -                         |
| `geography`            | Text          | -                         |
| `history`              | Text          | -                         |
| `campaigns`            | Many2many     | `dnd.campaign`            |
| `regions`              | Many2many     | `dnd.region`              |

---
