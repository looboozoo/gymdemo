/* Gymfinity – trackers.js (always-on)
 * Centralized third‑party loader for demo
 * NOTE: Toggles removed — everything loads automatically on DOMContentLoaded.
 */

(function(){
  // --- Helpers ---
  function loadScript(src, { async=true, defer=false, attrs={} }={}){
    return new Promise((resolve, reject)=>{
      const s = document.createElement('script');
      s.src = src; s.async = async; s.defer = defer;
      s.crossOrigin = 'anonymous';
      Object.entries(attrs).forEach(([k,v])=> s.setAttribute(k, v));
      s.onload = ()=> resolve(src);
      s.onerror = ()=> reject(new Error('Failed to load '+src));
      (document.head || document.documentElement).appendChild(s);
    });
  }
  function beacon(url){
    const img = new Image();
    img.src = url; img.alt = ''; img.width = 1; img.height = 1; img.style = 'display:none';
    document.body && document.body.appendChild(img);
  }

  // --- Safe stubs to avoid ReferenceErrors prior to real libs ---
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
  window.fbq = window.fbq || function(){ (window.fbq.q = window.fbq.q || []).push(arguments); };
  window.analytics = window.analytics || { page(){}, track(){}, identify(){}, group(){}, alias(){} };

  // --- Vendors (dummy IDs/keys for detection only) ---
  const Vendors = {
    // Google Analytics 4
    ga4: async function(){
      await loadScript('https://www.googletagmanager.com/gtag/js?id=G-DEMO123456');
      gtag('js', new Date());
      gtag('config', 'G-DEMO123456', { anonymize_ip: true, debug_mode: true });
      gtag('event', 'page_view');
      beacon('https://www.google-analytics.com/collect?v=1&t=pageview&tid=UA-000000-2&cid=555&dp=%2Fdemo-noscript');
    },
    // Google Tag Manager
    gtm: async function(){
      (function(w,d,s,l,i){ w[l]=w[l]||[]; w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:''; j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl; f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-ABCDE1');
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-ABCDE1';
      iframe.width = 0; iframe.height = 0; iframe.style = 'display:none;visibility:hidden';
      document.body && document.body.appendChild(iframe);
    },
    // Google Ads
    gAds: async function(){
      await loadScript('https://www.googletagmanager.com/gtag/js?id=AW-1234567890');
      gtag('js', new Date());
      gtag('config', 'AW-1234567890');
      gtag('event', 'conversion', { 'send_to': 'AW-1234567890/DEMOlabel123' });
      beacon('https://www.google.com/pagead/1p-conversion/1234567890/?label=DEMOlabel123&guid=ON&script=0');
      beacon('https://googleads.g.doubleclick.net/pagead/viewthroughconversion/1234567890/?guid=ON&script=0');
    },
    // Meta (Facebook) Pixel
    meta: async function(){
      !(function(f,b,e,v,n,t,s){ if(f.fbq) return; n=f.fbq=function(){ n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments) };
        if(!f._fbq) f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0'; n.queue=[]; t=b.createElement(e); t.async=!0; t.src=v;
        s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '000000000000000');
      fbq('track', 'PageView');
      beacon('https://www.facebook.com/tr?id=000000000000000&ev=PageView&noscript=1');
    },
    // Segment
    segment: async function(){
      !function(){var analytics=window.analytics=window.analytics||[]; if(!analytics.initialize)
        if(analytics.invoked) window.console && console.error && console.error('Segment snippet included twice.');
        else{ analytics.invoked=!0; analytics.methods=['trackSubmit','trackClick','trackLink','trackForm','pageview','identify','reset','group','track','ready','alias','debug','page','once','off','on','addSourceMiddleware','addIntegrationMiddleware','setAnonymousId','addDestinationMiddleware'];
          analytics.factory=function(t){ return function(){ var e=Array.prototype.slice.call(arguments); e.unshift(t); analytics.push(e); return analytics } };
          for(var t=0; t<analytics.methods.length; t++){ var e=analytics.methods[t]; analytics[e]=analytics.factory(e) }
          analytics.load=function(key){ var n=document.createElement('script'); n.async=!0; n.src='https://cdn.segment.com/analytics.js/v1/'+key+'/analytics.min.js'; var a=document.getElementsByTagName('script')[0]; a.parentNode.insertBefore(n,a) };
          analytics.SNIPPET_VERSION='4.15.3'; analytics.load('111'); analytics.page(); }}();
    },
    // Mixpanel
    mixpanel: async function(){
      (function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split('.');2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c='mixpanel';a.people=a.people||[];a.toString=function(a){var d='mixpanel';'mixpanel'!==c&&(d+='.'+c);a||(d+=' (stub)');return d};a.people.toString=function(){return a.toString(1)+'.people (stub)'};i='disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove'.split(' ');
      for(h=0;h<i.length;h++)g(a,i[h]);var j='set set_once union unset remove delete'.split(' ');a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=['get_group'].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement('script');e.type='text/javascript';e.async=!0;e.src='https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js';g=f.getElementsByTagName('script')[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||{});
      window.mixpanel.init('3bb2b055100e2d2ea5ba833f048b806f');
      window.mixpanel.track('Sign up');
    },
    // FullStory
    fullstory: async function(){
      window._fs_debug = false; window._fs_host = 'fullstory.com'; window._fs_script = 'edge.fullstory.com/s/fs.js'; window._fs_org = 'QDM8F'; window._fs_namespace = 'FS';
      (function (m, n, e, t, l, o, g, y) {
        if (e in m) { if (m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'); } return; }
        g = m[e] = function (a, b, s) { g.q ? g.q.push([a, b, s]) : g._api(a, b, s); }; g.q = [];
        o = n.createElement(t); o.async = 1; o.crossOrigin = 'anonymous'; o.src = 'https://' + _fs_script;
        y = n.getElementsByTagName(t)[0]; y.parentNode.insertBefore(o, y);
        g.identify = function (i, v, s) { g(l, { uid: i }, s); if (v) g(l, v, s) }; g.setUserVars = function (v, s) { g(l, v, s) }; g.event = function (i, v, s) { g('event', { n: i, p: v }, s) };
        g.shutdown = function () { g('rec', !1) }; g.restart = function () { g('rec', !0) };
        g.log = function (a, b) { g('log', [a, b]) };
        g.consent = function (a) { g('consent', !arguments.length || a) };
        g.identifyAccount = function (i, v) { o = 'account'; v = v || {}; v.acctId = i; g(o, v) };
        g.clearUserCookie = function () { };
      })(window, document, window._fs_namespace, 'script', 'user');
    },
    // Heap
    heap: async function(){
      window.heap = window.heap || [];
      (function(){
        var e = '3066573028'; var t = {}; window.heap.appid = e; window.heap.config = t = t || {}; 
        var r = t.forceSSL || 'https:' === document.location.protocol;
        var a = document.createElement('script'); a.type = 'text/javascript'; a.async = true; a.src = (r ? 'https:' : 'http:') + '//cdn.heapanalytics.com/js/heap-' + e + '.js';
        var n = document.getElementsByTagName('script')[0]; n.parentNode.insertBefore(a, n);
        function o(method){ return function(){ heap.push([method].concat(Array.prototype.slice.call(arguments, 0))) } }
        var p = ['addEventProperties','addUserProperties','clearEventProperties','identify','resetIdentity','removeEventProperty','setEventProperties','track','unsetEventProperty'];
        for (var c=0; c<p.length; c++) heap[p[c]] = o(p[c]);
      })();
    },
    // Snap Pixel
    snap: async function(){
      (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script';r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})(window,document,'https://sc-static.net/scevent.min.js');
      window.snaptr('init', 'a07acd57-9ea0-4500-a9a9-abd5071fae5f', { 'user_email': 'dev@transcend.io' });
      window.snaptr('track', 'PAGE_VIEW');
    },
    // Reddit Pixel
    reddit: async function(){
      !(function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement('script');t.src='https://www.redditstatic.com/ads/pixel.js';t.async=!0;var s=d.getElementsByTagName('script')[0];s.parentNode.insertBefore(t,s)}})(window,document);
      window.rdt('init','t2_6e8x0afn');
      window.rdt('track', 'PageVisit');
    },
    // Profitwell
    profitwell: async function(){
      if (!document.getElementById('profitwell-js')) {
        const s = document.createElement('script');
        s.id = 'profitwell-js';
        s.setAttribute('data-pw-auth','7bb89422cbd779ff6910f047581bdbd1');
        (document.head || document.documentElement).appendChild(s);
      }
      (function(i,s,o,g,r,a,m){i[o]=i[o]||function(){(i[o].q=i[o].q||[]).push(arguments)}; a=s.createElement(g); m=s.getElementsByTagName(g)[0]; a.async=1; a.src=r+'?auth='+ s.getElementById(o+'-js').getAttribute('data-pw-auth'); m.parentNode.insertBefore(a,m); })(window,document,'profitwell','script','https://public.profitwell.com/js/profitwell.js');
      window.profitwell && window.profitwell('start', { 'user_email': 'test+access@transcend.io' });
    },
    // Pinterest
    pinterest: async function(){
      (function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk; n.queue=[]; n.version='3.0'; var t=document.createElement('script'); t.async=true; t.src=e; var r=document.getElementsByTagName('script')[0]; r.parentNode.insertBefore(t,r)}})('https://s.pinimg.com/ct/core.js');
      window.pintrk('load','2614160671254',{ em: 'test+access@transcend.io' });
      window.pintrk('page');
      beacon('https://ct.pinterest.com/v3/?event=init&tid=2614160671254&pd[em]=f1dd11149c22aac7b517d534308284eead1124ed3913995b7481e5ac7b34d145&noscript=1');
    },
    // Sentry
    sentry: async function(){
      await loadScript('https://browser.sentry-cdn.com/5.12.1/bundle.min.js', { attrs: { integrity: 'sha384-y+an4eARFKvjzOivf/Z7JtMJhaN6b+lLQ5oFbBbUwZNNVir39cYtkjW1r6Xjbxg3', crossorigin: 'anonymous' } });
      // Example: Sentry.init({ dsn: '...' })
    },
    // Fonts & CSS
    assets: async function(){
      const link1 = document.createElement('link'); link1.rel='stylesheet'; link1.href='https://fonts.googleapis.com/css?family=Heebo:400,700|Oxygen:700'; document.head.appendChild(link1);
      const link2 = document.createElement('link'); link2.rel='stylesheet'; link2.href='dist/css/style.css'; document.head.appendChild(link2);
      await loadScript('https://unpkg.com/scrollreveal@4.0.5/dist/scrollreveal.min.js');
      if (window.ScrollReveal) { window.ScrollReveal().reveal('[data-reveal]'); }
    }
  };

  async function loadAll(){
    await Promise.allSettled([
      Vendors.assets(),
      Vendors.ga4(),
      Vendors.gtm(),
      Vendors.gAds(),
      Vendors.meta(),
      Vendors.segment(),
      Vendors.mixpanel(),
      Vendors.fullstory(),
      Vendors.heap(),
      Vendors.snap(),
      Vendors.reddit(),
      Vendors.profitwell(),
      Vendors.pinterest(),
      Vendors.sentry()
    ]);
  }

  // Expose minimal API (no toggles)
  window.GymfinityTracks = { loadAll, load: Vendors };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAll, { once: true });
  } else {
    loadAll();
  }
})();
