// CMS Content Loader — Edge21 Marketing
// Loads content from JSON files and injects into the page

(function() {
  'use strict';

  function setHTML(id, html) {
    var el = document.getElementById(id);
    if (el && html !== undefined && html !== null) el.innerHTML = html;
  }

  function setAttr(id, attr, val) {
    var el = document.getElementById(id);
    if (el && val) el.setAttribute(attr, val);
  }

  function loadPage(jsonPath, callback) {
    fetch(jsonPath)
      .then(function(r) { return r.json(); })
      .then(callback)
      .catch(function(e) { console.log('CMS content load skipped:', e.message); });
  }

  // --- POPUP ---
  loadPage('/admin/popup-settings.json', function(d) {
    setHTML('cms-popup-heading', d.heading);
    setHTML('cms-popup-subtext', d.subtext);
    setHTML('cms-popup-cta', d.cta_text);
    setHTML('cms-popup-note', d.note);
    if (d.form_id) {
      var form = document.getElementById('cms-popup-form');
      if (form) form.setAttribute('data-form-id', d.form_id);
    }
    if (d.enabled === false) {
      var popup = document.getElementById('popup');
      if (popup) popup.style.display = 'none';
    }
  });

  // --- HOME PAGE ---
  if (document.getElementById('cms-hero-tag')) {
    loadPage('/admin/content-home.json', function(d) {
      setHTML('cms-hero-tag', d.hero_tag);
      setHTML('cms-hero-headline', d.hero_headline);
      setHTML('cms-hero-subtext', d.hero_subtext);
      setHTML('cms-hero-cta-primary', d.hero_cta_primary_text);
      setAttr('cms-hero-cta-primary', 'href', d.hero_cta_primary_link);
      setHTML('cms-hero-cta-secondary', d.hero_cta_secondary_text);
      setAttr('cms-hero-cta-secondary', 'href', d.hero_cta_secondary_link);
      setHTML('cms-callout-headline', d.callout_headline);
      setHTML('cms-callout-text', d.callout_text);
      setHTML('cms-callout-cta', d.callout_cta_text);
      setAttr('cms-callout-cta', 'href', d.callout_cta_link);
      setHTML('cms-cta-headline', d.cta_banner_headline);
      setHTML('cms-cta-text', d.cta_banner_text);
    });
  }

  // --- ABOUT PAGE ---
  if (document.getElementById('cms-about-headline')) {
    loadPage('/admin/content-about.json', function(d) {
      setHTML('cms-page-headline', d.page_headline);
      setHTML('cms-page-subtitle', d.page_subtitle);
      setHTML('cms-about-headline', d.bio_headline);
      setHTML('cms-about-p1', d.bio_p1);
      setHTML('cms-about-p2', d.bio_p2);
      setHTML('cms-about-p3', d.bio_p3);
      setHTML('cms-about-p4', d.bio_p4);
      if (d.photo) {
        var img = document.getElementById('cms-about-photo');
        if (img) img.setAttribute('src', d.photo);
      }
      setHTML('cms-cta-headline', d.cta_headline);
      setHTML('cms-cta-text', d.cta_text);
    });
  }

  // --- SERVICES PAGE ---
  if (document.getElementById('cms-services-headline')) {
    loadPage('/admin/content-services.json', function(d) {
      setHTML('cms-page-headline', d.page_headline);
      setHTML('cms-page-subtitle', d.page_subtitle);
      setHTML('cms-services-headline', d.service1_title);
      setHTML('cms-service1-badge', d.service1_badge);
      setHTML('cms-service1-title', d.service1_title);
      setHTML('cms-service1-desc', d.service1_desc);
      setHTML('cms-service1-price', d.service1_price);
      setHTML('cms-service1-price-note', d.service1_price_note);
      setHTML('cms-service1-cta', d.service1_cta);
      setHTML('cms-service2-title', d.service2_title);
      setHTML('cms-service2-desc', d.service2_desc);
      setHTML('cms-service2-price', d.service2_price);
      setHTML('cms-service2-price-note', d.service2_price_note);
      setHTML('cms-service2-cta', d.service2_cta);
      setHTML('cms-service3-title', d.service3_title);
      setHTML('cms-service3-desc', d.service3_desc);
      setHTML('cms-service3-price', d.service3_price);
      setHTML('cms-service3-price-note', d.service3_price_note);
      setHTML('cms-service3-cta', d.service3_cta);
      setHTML('cms-callout-headline', d.callout_headline);
      setHTML('cms-callout-text', d.callout_text);
    });
  }

  // --- CONTACT PAGE ---
  if (document.getElementById('cms-contact-headline')) {
    loadPage('/admin/content-contact.json', function(d) {
      setHTML('cms-page-headline', d.page_headline);
      setHTML('cms-page-subtitle', d.page_subtitle);
      setHTML('cms-contact-headline', d.info_headline);
      setHTML('cms-contact-text1', d.info_text1);
      setHTML('cms-contact-text2', d.info_text2);
      setHTML('cms-contact-email', d.email);
      setAttr('cms-contact-email', 'href', 'mailto:' + d.email);
      setHTML('cms-contact-instagram', d.instagram);
      setHTML('cms-response-time', d.response_time);
      setHTML('cms-cta-headline', d.cta_headline);
      setHTML('cms-cta-text', d.cta_text);
    });
  }

})();
