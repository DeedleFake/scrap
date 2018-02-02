Scrap
=====

Scrap is a simple cryptocurrency portfolio tracker. Or, it hopefully will be. It's a bit early in development at the moment, but feel free to submit a pull request. Or a [donation][donate]. I'll take either, really.

Why?
----

After trying several portfolio trackers, I eventually got fed up with all of them. I tried to build a spreadsheet to do the tracking, but it was massive, slow, and broke very easily. So I decided to just write a new one.

Goals
-----

- [ ] Very simple. Just add a purchase, indicating amount of what currency spent, and it will show up in a nicely formatted list, automatically adjusting the entire portfolio balance to provide a single total value without a need to add a matching sell for the currency used to buy the new one.
- [ ] No central server. Just save to a simple JSON file. This can then be, for example, stored in a private git repository for synchronization and backup purposes.
- [ ] Ability to import CSV files with purchase data with clean control over which columns are what in the imported data.

Possible Eventual Features
--------------------------

- [ ] Alerts? The problem with this is that it would require the app to continue running in the background, but some people might not mind that.
- [ ] Separate project that provides a server that this can use for synchronization? Might be overkill.
- [ ] Android app?

[donate]: https://deedlefake.com/qrgen/?data=1C9RFY8K5vji1tfu28xr3XuHLRAbNUrWCX
