// =====================================================
// events.js : applique les incidents de la mission
// Propriétaire : coordinateur (membre 5)
//
// Les événements eux-mêmes (textes, jours, effets) sont écrits
// par le membre 4 dans mission-data.js (liste "events").
// =====================================================

// Cherche l'événement prévu pour un jour donné (ou rien)
function getEventForDay(day) {
  var events = getMissionData().events;
  for (var i = 0; i < events.length; i++) {
    if (events[i].day === day) { return events[i]; }
  }
  return null;
}

// Applique l'événement à l'état et le note dans le rapport du jour
function applyEvent(s, ev, report) {
  addEffects(s, ev.effects || {});
  s.incidents.push({
    day: s.day,
    title: ev.title || "Incident",
    text: ev.text || "",
    explanation: ev.explanation || ""
  });
  report.event = {
    title: ev.title || "Incident",
    text: ev.text || "",
    effects: effectsText(ev.effects || {}),
    explanation: ev.explanation || ""
  };
  report.lines.push("Incident : " + (ev.title || "Incident") + " (" + effectsText(ev.effects || {}) + ")");
}
