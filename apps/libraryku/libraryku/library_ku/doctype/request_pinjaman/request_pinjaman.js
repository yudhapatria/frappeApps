// Copyright (c) 2019, yudha and contributors
// For license information, please see license.txt

frappe.ui.form.on('Request Pinjaman', {
	refresh: function(frm) {
		
			frm.add_custom_button(__('Button'), function(){
				frappe.msgprint('Hei')
			},__("")).addClass("btn-primary");
		
	},
	tanggal_pinjam : function(frm){
		if(frm.doc.tanggal_pinjam < get_today()){
			frm.set_value('tanggal_pinjam', '')
			frm.set_value('estimasi_tanggal_pinjam', '')
			frappe.throw(__('Tidak Dapat Memilih Tanggal yang Sudah Lewat'))	
		
		}
		if(frm.doc.tanggal_pinjam){
			frappe.call({
				method: 'frappe.client.get',
				args: {
					doctype: 'Master Member',
					name: frm.doc.id_member
				},
				callback: function(r){
					if(r.message){
						var tipe, estimasi, tgl_estimasi

						tipe = r.message.tipe_member

						if (tipe == 'Bronze'){
							estimasi = 3
						}else if(tipe == 'Silver'){
							estimasi = 5
						}else{
							estimasi = 10
						}

						tgl_estimasi = frappe.datetime.add_days(frm.doc.tanggal_pinjam, estimasi)
						frm.set_value('estimasi_tanggal_kembali', tgl_estimasi)
					}
				}
			})
		}
	},
	
});

/*
cur_frm.set_query('field_name, 'field_name_child', function(doc, cdt, cdn){
	var d = locals[cdt][cdn];
	return{
		filters: [
			['filter_condition', 'fieldname', 'condition', 'value']
		]	
	}
});
field_name = id reference
field_name_child = doctype yang dipilih

filter_condition = doctype 
fieldname = field yang ingin dibandingkan
condition = > / < / = / !=
value = nilai pembanding

*/
cur_frm.set_query('code_buku', 'request_line', function(frm, cdt, cdn){
	var d = locals[cdt][cdn];
	return{
		filters: [
			['Master Buku', 'status', '=', 'Available']
		]
	}
});
