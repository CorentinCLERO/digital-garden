# Ajouter un site/service accessible via Tailscale VPN

## 1. Prérequis

- Tailscale installé et connecté sur le serveur et sur l’appareil client.
- Le service (ex : Netdata) fonctionne sur le serveur (testé en local).

---

## 2. Rendre le service accessible via Tailscale

### a) Configurer le service pour écouter sur l’interface Tailscale

- Trouver l’IP Tailscale du serveur :
  ```bash
  tailscale ip -4
  ```
- Modifier la configuration du service (ex : `/etc/netdata/netdata.conf`) :
  ```
  bind socket to IP = [IP_TAILSCALE_DU_SERVEUR]
  ```
  *(ou `0.0.0.0` si tu veux aussi l’accès local/réseau)*

- Redémarrer le service :
  ```bash
  sudo systemctl restart netdata
  ```

---

### b) Ouvrir le port dans la configuration ACL de Tailscale (si tu utilises les ACL)

- Exemple d’ACL dans `tailscale.com/admin/acls` :
  ```json
  {
    "grants": [
      {
        "src": ["CorentinCLERO@github"],
        "dst": ["tag:server", "IP_TAILSCALE_DU_SERVEUR"],
        "ip":  ["22", "19999"]
      }
    ]
  }
  ```
  - Ici, seul l’utilisateur `CorentinCLERO@github` peut accéder au port 19999 (Netdata) et 22 (SSH) sur le serveur (IP Tailscale `IP_TAILSCALE_DU_SERVEUR` ou tag `server`).

- **Enregistrer et appliquer** la configuration sur le dashboard Tailscale.

---

### c) Accéder au service

- Depuis un appareil client connecté à Tailscale :
  ```
  http://[IP_TAILSCALE_DU_SERVEUR]:[PORT]
  ```
  *(ex : http://IP_TAILSCALE_DU_SERVEUR:19999)*

---

## 3. (À compléter) Ajouter un site/service accessible depuis Internet

> _Section à remplir plus tard pour l’ouverture sécurisée d’un service sur Internet (reverse proxy, HTTPS, firewall, etc.)._
