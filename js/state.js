/* ÉTAT PARTAGÉ : ROLES, ROLE_META, state, isMeAdmin — lu par tous les autres fichiers */
    const ROLES = ['energy', 'shield', 'life', 'comms', 'nav'];
    const ROLE_META = {
      energy: { icon: '⚡', label: 'Énergie', color: 'text-amber-300' },
      shield: { icon: '🛡️', label: 'Bouclier', color: 'text-rose-300' },
      life:   { icon: '🌱', label: 'Biosphère', color: 'text-emerald-300' },
      comms:  { icon: '📡', label: 'Télémétrie', color: 'text-sky-300' },
      nav:    { icon: '🧭', label: 'Navigation', color: 'text-purple-300' }
    };

    const params = new URLSearchParams(window.location.search);
    const hasSharedRoom = Boolean(params.get('room'));
    /* Sans lien d'invitation : on est l'HÔTE et on reçoit un code de salle unique (plus de salle commune à tout le monde). */
    const defaultRoom = (params.get('room') || 'SOL-' + Math.random().toString(36).slice(2, 6)).toUpperCase();

    const state = {
      gameMode: hasSharedRoom ? 'coop' : 'coop',
      playerId: 'p_' + Math.random().toString(36).substring(2, 9),
      playerName: 'Astronaute',
      roomCode: defaultRoom,
      commanderId: null,
      commanderName: null,
      commanderOnline: false,
      myRole: null,
      useAiBots: false,
      started: false,
      sol: 1,
      maxSols: 5,
      secondsLeft: 75,
      score: 1500,
      energy: 75,
      shield: 75,
      life: 75,
      canCreateRoom: !hasSharedRoom,
      netOk: true,
      roomMissing: false,
      gameOver: false,
      victory: false,
      failReason: '',
      radioText: "En attente du lancement par l'Admin...",
      puzzle: null,
      lobbySeats: { energy: null, shield: null, life: null, comms: null, nav: null },
      crew: {
        energy: { playerId: null, name: 'Poste libre', done: false, attempts: 3, isBot: false },
        shield: { playerId: null, name: 'Poste libre', done: false, attempts: 3, isBot: false },
        life:   { playerId: null, name: 'Poste libre', done: false, attempts: 3, isBot: false },
        comms:  { playerId: null, name: 'Poste libre', done: false, attempts: 3, isBot: false },
        nav:    { playerId: null, name: 'Poste libre', done: false, attempts: 3, isBot: false }
      }
    };

    function isMeAdmin() {
      if (state.gameMode === 'solo') return true;
      return Boolean(state.commanderId && state.commanderId === state.playerId);
    }
